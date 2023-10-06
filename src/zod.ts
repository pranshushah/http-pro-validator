import { ParseParams, TypeOf, ZodSchema } from 'zod';

export async function validateZodSchema<TSchema extends ZodSchema>(
	schema: TSchema,
	options: Partial<ParseParams> = {},
	data: TypeOf<TSchema>,
): Promise<void> {
	return schema.parse(data, { async: false, ...options });
}
