import { Schema } from 'yup';
import { HValidationOptions } from './types';

export function validateYupSchema<TSchema extends Schema>(
  options: Parameters<TSchema['validate']>[1] = {}
) {
  return async <ResponseType extends any = any>(
    data: ResponseType,
    validationOptions: HValidationOptions = { mode: 'async', raw: true },
    schema?: TSchema
  ): Promise<ResponseType> => {
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
