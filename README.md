# @http-pro/validator
schema validation functions for http-pro

## install 

    npm i @http-pro/validator

## supported resolvers

-  [Yup](#Yup)
    1. [API](#api)
    2. [Example](#example)

-  [zod](#Zod)
    1. [API](#api-1)
    2. [Example](#example-1)

## Yup

### API

```typescript
import { AnyObjectSchema } from 'yup';


type HPValidationOptions = {
  /**
   * @default 'async'
   */
  mode?: 'async' | 'sync';
  /**
   * @description If true, the validation function will return the raw data instead of the parsed data.
   * @default true
   */
  raw?: boolean;
};

decalre function validateYupSchema<TSchema extends AnyObjectSchema>(
  yupOptions: Parameters<AnyObjectSchema['validate']>[1] = {}
) {
  return async <ResponseType extends any = any>(
    data: ResponseType,
    validationOptions: HPValidationOptions = defaultValidationOptions,
    schema?: TSchema
  ): Promise<ResponseType>



```

### Example

```ts

import { hp } from "http-pro";
import * as yup from "yup";
import { validateYupSchema } from "@http-pro/validator";

const ResponseDataSchema = yup.object().shape({
  title: yup.string().required(),
  completed: yup.boolean().required(),
  id: yup.number().required(),
  userId: yup.number().required()
});

type ResponseData = {
  title: string;
  completed: boolean;
  id: number;
  userId: number;
};

(async function () {
  const hpInstance = hp.create({ validationFunction: validateYupSchema() });
  const res = await hpInstance.get<ResponseData>(
    "https://jsonplaceholder.typicode.com/todos/3",
    { validationSchema: ResponseDataSchema }
  );
  console.log(res.data);
})();



```

## Zod

### API 

```ts

import { ZodSchema, ParseParams } from 'zod';


type HPValidationOptions = {
  /**
   * @default 'async'
   */
  mode?: 'async' | 'sync';
  /**
   * @description If true, the validation function will return the raw data instead of the parsed data.
   * @default true
   */
  raw?: boolean;
};

decalre function validateZodSchema<TSchema extends ZodSchema>(
  options: Partial<ParseParams> = {}
) {
  return async <ResponseType extends any = any>(
    data: ResponseType,
    validationOptions: HPValidationOptions = defaultValidationOptions,
    schema?: TSchema
  ): Promise<ResponseType>



```

### example


```ts

import hp from "http-pro";
import { validateZodSchema } from "@http-pro/validator";
import { object, string, boolean, number } from "zod";

const ResponseDataSchema = object({
  title: string().toUpperCase(),
  completed: boolean(),
  id: number(),
  userId: number()
});

type ResponseData = {
  title: string;
  completed: boolean;
  id: number;
  userId: number;
};

const hpInstance = hp.create({
  validationFunction: validateZodSchema(),
  validationOptions: { raw: false }
});

(async function () {
  const res = await hpInstance.get<ResponseData>(
    "https://jsonplaceholder.typicode.com/todos/3",
    {
      validationSchema: ResponseDataSchema
    }
  );
  console.log(res.data);
})();



```

