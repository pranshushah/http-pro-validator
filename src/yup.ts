import { Schema, InferType } from 'yup';

export async function validateYupSchema<TSchema extends Schema>(
	schema: TSchema,
	data: InferType<TSchema>,
	options: Parameters<TSchema['validate']>[1] = {},
) {
	return schema.validateSync(data, { abortEarly: false, ...options });
}
