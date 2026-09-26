// Dependency-free validator for the subset of JSON Schema used by
// schema/camera-moves.schema.json: type, enum, pattern, minLength, minItems,
// minimum, maximum, required, properties, additionalProperties, items.
// Returns a list of "path: message" strings; an empty list means valid.

const TYPE_CHECKS = {
  array: Array.isArray,
  object: (v) => v !== null && typeof v === 'object' && !Array.isArray(v),
  string: (v) => typeof v === 'string',
  number: (v) => typeof v === 'number' && Number.isFinite(v),
  integer: Number.isInteger,
  boolean: (v) => typeof v === 'boolean',
};

export function validate(value, schema, path = '$') {
  const errors = [];
  if (schema.type) {
    const check = TYPE_CHECKS[schema.type];
    if (!check) throw new Error(`unsupported schema type "${schema.type}" at ${path}`);
    if (!check(value)) return [`${path}: expected ${schema.type}`];
  }
  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${path}: "${value}" is not one of ${schema.enum.join(', ')}`);
  }
  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push(`${path}: shorter than ${schema.minLength}`);
    }
    if (schema.pattern && !new RegExp(schema.pattern, 'u').test(value)) {
      errors.push(`${path}: does not match ${schema.pattern}`);
    }
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) errors.push(`${path}: below ${schema.minimum}`);
    if (schema.maximum !== undefined && value > schema.maximum) errors.push(`${path}: above ${schema.maximum}`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      errors.push(`${path}: fewer than ${schema.minItems} items`);
    }
    if (schema.items) value.forEach((item, i) => errors.push(...validate(item, schema.items, `${path}[${i}]`)));
  }
  if (TYPE_CHECKS.object(value)) {
    for (const key of schema.required ?? []) {
      if (!(key in value)) errors.push(`${path}: missing "${key}"`);
    }
    const props = schema.properties ?? {};
    for (const [key, v] of Object.entries(value)) {
      if (props[key]) errors.push(...validate(v, props[key], `${path}.${key}`));
      else if (schema.additionalProperties === false) errors.push(`${path}: unexpected "${key}"`);
    }
  }
  return errors;
}

// Rules JSON Schema can't express: unique ids, sane duration ranges.
export function checkRecords(records) {
  const errors = [];
  const seen = new Set();
  records.forEach((r, i) => {
    if (seen.has(r.id)) errors.push(`$[${i}].id: duplicate "${r.id}"`);
    seen.add(r.id);
    if (r.recommended_duration_min_s > r.recommended_duration_max_s) {
      errors.push(`$[${i}]: recommended_duration_min_s > recommended_duration_max_s`);
    }
    if (!r.tutorial_url.includes(`/prompt-recipes/${r.id}?`)) {
      errors.push(`$[${i}].tutorial_url: does not point at /prompt-recipes/${r.id}`);
    }
    if (!r.prompt_template.endsWith(r.prompt)) {
      errors.push(`$[${i}].prompt_template: does not end with the recipe prompt`);
    }
  });
  return errors;
}
