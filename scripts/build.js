// Regenerate data/camera-moves.csv and the README reference table from
// data/camera-moves.json (the source of truth). Run: npm run build
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { injectReadme, toCsv } from '../src/build.js';
import { checkRecords, validate } from '../src/validate.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFile(path.join(root, p), 'utf8');

const records = JSON.parse(await read('data/camera-moves.json'));
const schema = JSON.parse(await read('schema/camera-moves.schema.json'));
const errors = [...validate(records, schema), ...checkRecords(records)];
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

await writeFile(path.join(root, 'data/camera-moves.csv'), toCsv(records));
await writeFile(path.join(root, 'README.md'), injectReadme(await read('README.md'), records));
console.log(`built ${records.length} records -> data/camera-moves.csv, README.md`);
