import { Schema } from 'yup';

export async function validateYupSchema<TSchema extends Schema>(
  options: Parameters<TSchema['validate']>[1] = {}
) {
  return (schema: TSchema, data: any) => {
    return schema.validateSync(data, { abortEarly: false, ...options });
  };
}
