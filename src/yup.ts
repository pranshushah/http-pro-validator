import { AnyObjectSchema } from 'yup';
import { HPValidationOptions } from 'http-pro';
import { defaultValidationOptions } from './constants';

export function validateYupSchema<TSchema extends AnyObjectSchema>(
  options: Parameters<AnyObjectSchema['validate']>[1] = {}
) {
  return async <ResponseType extends any = any>(
    data: ResponseType,
    validationOptions: HPValidationOptions = defaultValidationOptions,
    schema?: TSchema
  ): Promise<ResponseType> => {
    if (schema) {
      const parsedValue = await schema[
        validationOptions.mode === 'async' ? 'validate' : 'validateSync'
      ](data, {
        abortEarly: false,
        ...options,
      });
      return validationOptions.raw ? data : parsedValue;
    } else {
      return data;
    }
  };
}
