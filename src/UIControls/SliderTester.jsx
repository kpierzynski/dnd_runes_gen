import { rankWith, schemaTypeIs, uiTypeIs, schemaMatches, and, isRangeControl } from '@jsonforms/core';

export default rankWith(
    3,
    and(
      uiTypeIs('Control'),
      schemaTypeIs('integer'),
      schemaMatches(schema => {
        if (schema.hasOwnProperty('format')) {
          return schema['format'] === 'slider';
        }
        return false;
      })
    )
  );