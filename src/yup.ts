import { Schema } from 'yup';

export async function validateYupSchema<TSchema extends Schema>(
  schema: TSchema,
  options: Parameters<TSchema['validate']>[1] = {}
) {
  return (data: any) => {
    return schema.validateSync(data, { abortEarly: false, ...options });
  };
}
