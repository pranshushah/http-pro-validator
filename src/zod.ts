import { ParseParams, ZodSchema } from 'zod';
import { HValidationOptions } from './types';

export async function validateZodSchema<TSchema extends ZodSchema>(
  options: Partial<ParseParams> = {}
) {
  return (
    schema: TSchema,
    data: any,
    validationOptions: HValidationOptions = { mode: 'async', raw: true }
  ) => {
    const parsedValue = schema.parse(data, {
      async: validationOptions.mode === 'async' ? true : false,
      ...options,
    });
    return validationOptions.raw ? data : parsedValue;
  };
}
