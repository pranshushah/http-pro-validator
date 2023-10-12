import { ParseParams, ZodSchema } from 'zod';
import { HValidationOptions } from './types';

export function validateZodSchema<TSchema extends ZodSchema>(
  options: Partial<ParseParams> = {}
) {
  return async <ResponseType extends any = any>(
    data: ResponseType,
    validationOptions: HValidationOptions = { mode: 'async', raw: true },
    schema?: TSchema
  ): Promise<ResponseType> => {
    if (schema) {
      const parsedValue = schema.parse(data, {
        async: validationOptions.mode === 'async' ? true : false,
        ...options,
      });
      return validationOptions.raw ? data : parsedValue;
    } else {
      return data;
    }
  };
}
