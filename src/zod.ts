import { ParseParams, ZodSchema } from 'zod';

export async function validateZodSchema<TSchema extends ZodSchema>(
  schema: TSchema,
  options: Partial<ParseParams> = {}
) {
  return (data: any) => {
    return schema.parse(data, { async: false, ...options });
  };
}
