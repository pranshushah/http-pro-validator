import { ParseParams, TypeOf, ZodSchema } from 'zod';

export async function validateZodSchema<TSchema extends ZodSchema>(
  schema: TSchema,
  options: Partial<ParseParams> = {}
) {
  return (data: TypeOf<TSchema>) => {
    return schema.parse(data, { async: false, ...options });
  };
}
