import { object, string } from 'yup';
import { validateYupSchema } from '../yup';

describe('validateYupSchema', () => {
  it('should validate data against a schema', async () => {
    const schema = object({
      name: string().required(),
      age: string().required(),
    });

    const validate = validateYupSchema({ stripUnknown: true });

    const data = {
      name: 'John Doe',
      age: '30',
    };

    const result = await validate(data, { mode: 'async' }, schema);

    expect(result).toEqual(data);
  });

  it('should return data if no schema is provided', async () => {
    const validate = validateYupSchema();

    const data = {
      name: 'John Doe',
      age: '30',
    };

    const result = await validate(data);

    expect(result).toEqual(data);
  });

  it("should throw an error if data doesn't match the schema", async () => {
    const validate = validateYupSchema();
    const data = {
      name: 'John Doe',
      age: 30,
    };
    const schema = object({
      name: string().required().min(20),
      age: string().required(),
    });
    await expect(validate(data, { mode: 'async' }, schema)).rejects.toThrow();
  });

  it("should apply options to the schema's validate method", async () => {
    const validate = validateYupSchema({ stripUnknown: true });
    const data = {
      name: 'John Doe',
      age: '30',
      unknown: 'unknown',
    };
    const schema = object({
      name: string().required(),
      age: string().required(),
    });
    const result = await validate(data, { mode: 'async' }, schema);
    expect(result).toEqual({
      name: 'John Doe',
      age: '30',
    });
  });
});
