import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORIES, CSV_COLUMNS, injectReadme, toCsv } from '../src/build.js';
import { checkRecords, validate } from '../src/validate.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFile(path.join(root, p), 'utf8');
const records = JSON.parse(await read('data/camera-moves.json'));
const schema = JSON.parse(await read('schema/camera-moves.schema.json'));

test('every record matches the JSON Schema', () => {
  assert.deepEqual(validate(records, schema), []);
});

test('ids are unique and cross-field rules hold', () => {
  assert.deepEqual(checkRecords(records), []);
});

test('the dataset has 43 moves across the 7 categories', () => {
  assert.equal(records.length, 43);
  assert.deepEqual(new Set(records.map((r) => r.category)), new Set(CATEGORIES));
});

test('the schema enum and the category list agree', () => {
  assert.deepEqual(schema.items.properties.category.enum, CATEGORIES);
});

test('the validator catches bad records', () => {
  const bad = structuredClone(records[0]);
  bad.category = 'Nope';
  bad.extra = true;
  delete bad.prompt;
  const errors = validate([bad], schema);
  assert.ok(errors.some((e) => e.includes('not one of')));
  assert.ok(errors.some((e) => e.includes('unexpected "extra"')));
  assert.ok(errors.some((e) => e.includes('missing "prompt"')));
  assert.ok(checkRecords([records[0], records[0]]).some((e) => e.includes('duplicate')));
});

test('data/camera-moves.csv is in sync with the JSON (run npm run build)', async () => {
  const csv = await read('data/camera-moves.csv');
  assert.equal(csv, toCsv(records));
  assert.equal(csv.split('\n')[0], CSV_COLUMNS.join(','));
});

test('the README table is in sync with the JSON (run npm run build)', async () => {
  const readme = await read('README.md');
  assert.equal(readme, injectReadme(readme, records));
  for (const r of records) assert.ok(readme.includes(r.poster_url), `README is missing ${r.id}`);
});
