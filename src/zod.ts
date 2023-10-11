import { ParseParams, ZodSchema } from 'zod';

export async function validateZodSchema<TSchema extends ZodSchema>(
  options: Partial<ParseParams> = {}
) {
  return (schema: TSchema, data: any) => {
    return schema.parse(data, { async: false, ...options });
  };
}
