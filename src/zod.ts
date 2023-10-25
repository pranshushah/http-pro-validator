import { ZodSchema, ParseParams } from 'zod';
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
      let parsedValue: ResponseType;
      if (validationOptions.mode === 'async') {
        parsedValue = await schema.parseAsync(data, {
          ...options,
          async: true,
        });
      } else {
        parsedValue = schema.parse(data, {
          ...options,
          async: false,
        });
      }
      return validationOptions.raw ? data : parsedValue;
    } else {
      return data;
    }
  };
}
