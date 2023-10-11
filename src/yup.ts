import { Schema } from 'yup';
import { HValidationOptions } from './types';

export async function validateYupSchema<TSchema extends Schema>(
  options: Parameters<TSchema['validate']>[1] = {}
) {
  return (
    schema: TSchema,
    data: any,
    validationOptions: HValidationOptions = { mode: 'async', raw: true }
  ) => {
    const parsedValue = schema[
      validationOptions.mode === 'async' ? 'validate' : 'validateSync'
    ](data, {
      abortEarly: false,
      ...options,
    });
    return validationOptions.raw ? data : parsedValue;
  };
}
