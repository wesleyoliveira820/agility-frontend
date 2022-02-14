import * as Yup from 'yup';
import type { SchemaOf } from 'yup';

type ValidationErrorsProps = {
  [key: string]: string;
}

function formatErrors(errors: Yup.ValidationError) {
  const validationErrors: ValidationErrorsProps = {};

  errors.inner.forEach(({ path = '', message }) => {
    validationErrors[path] = message;
  });

  return validationErrors;
}

async function validateData<T>(dataToBeValidated: T, schema: SchemaOf<T>) {
  try {
    await schema.validate(dataToBeValidated, {
      abortEarly: false,
    });
  } catch (errors) {
    if (errors instanceof Yup.ValidationError) {
      const validation = formatErrors(errors);
      return validation;
    }
  }
}

export default validateData;
