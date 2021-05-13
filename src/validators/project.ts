import * as Yup from 'yup';
import type { SchemaOf } from 'yup';

interface IValidatorProps {
  title: string;
  description?: string;
}

interface Errors {
  [key: string]: string;
}

async function createProjectValidator(payload: IValidatorProps) {
  const schema: SchemaOf<IValidatorProps> = Yup.object().shape({
    title: Yup.string().required('Este campo é obrigatório.'),
    description: Yup.string().max(120, 'O limite de caracteres foi excedido.'),
  });

  try {
    await schema.validate(payload, {
      abortEarly: false,
    });
  } catch (errors) {
    if (errors instanceof Yup.ValidationError) {
      const validationErrors: Errors = {};

      errors.inner.forEach(({ path = '', message }) => {
        validationErrors[path] = message;
      });

      return validationErrors;
    }
  }
}

export { createProjectValidator };
