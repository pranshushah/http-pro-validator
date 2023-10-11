import { Schema } from 'yup';
import { HValidationOptions } from './types';

export async function validateYupSchema<TSchema extends Schema>(
  options: Parameters<TSchema['validate']>[1] = {}
) {
  return (
    data: any,
    validationOptions: HValidationOptions = { mode: 'async', raw: true },
    schema?: TSchema
  ) => {
    if (schema) {
      const parsedValue = schema[
        validationOptions.mode === 'async' ? 'validate' : 'validateSync'
      ](data, {
        abortEarly: false,
        ...options,
      });
      return validationOptions.raw ? data : parsedValue;
    } else {
      return data;
    }
  };
}
