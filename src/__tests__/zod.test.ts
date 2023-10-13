import { string, object } from 'zod';
import { validateZodSchema } from '../zod';

describe('validateZodSchema', () => {
  it('should validate data against a schema', async () => {
    const schema = object({
      name: string().min(3),
      age: string().min(1),
    });

    const validate = validateZodSchema();

    const data = {
      name: 'John',
      age: '30',
    };

    const result = await validate(data, { mode: 'async' }, schema);

    expect(result).toEqual(data);
  });

  it('should return data if no schema is provided', async () => {
    const validate = validateZodSchema();

    const data = {
      name: 'John Doe',
      age: '30',
    };

    const result = await validate(data);

    expect(result).toEqual(data);
  });

  it('should throw an error if data does not match the schema', async () => {
    const schema = object({
      name: string().min(3),
      age: string().min(1),
    });

    const validate = validateZodSchema();

    const data = {
      name: 'J',
      age: '30',
    };

    await expect(validate(data, { mode: 'async' }, schema)).rejects.toThrow();
  });
  it("should apply options to the schema's validate method", async () => {
    const schema = object({
      name: string().min(3),
      age: string().min(1),
    });

    const validate = validateZodSchema({ async: false });

    const data = {
      name: 'John',
      age: '30',
      unknown: 'unknown',
    };

    const result = await validate(data, { mode: 'sync' }, schema);

    expect(result).toEqual({
      name: 'John',
      age: '30',
    });
  });
});
