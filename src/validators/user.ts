import * as Yup from 'yup';
import type { SchemaOf, BaseSchema } from 'yup';

interface IRegisterProps {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

interface Errors {
  [key: string]: string;
}

async function userRegisterValidator(userPayload: IRegisterProps) {
  const schema: SchemaOf<IRegisterProps> = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        '"Nome" deve conter apenas letras.',
      )
      .required('Este campo é obrigatório.'),

    email: Yup.string()
      .required('Este campo é obrigatório.')
      .email('Este email é inválido.'),

    password: Yup.string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres.')
      .required('Este campo é obrigatório.'),

    password_confirmation: Yup.string()
      .required('Este campo é obrigatório.')
      .when('password', (password: string, schemaObject: BaseSchema) => {
        if (password) {
          return schemaObject
            .equals([password, 'password_confirmation'], 'As senhas não são iguais.')
            .required('Este campo é obrigatório.');
        }
      }),
  });

  try {
    await schema.validate(userPayload, {
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

export { userRegisterValidator };
