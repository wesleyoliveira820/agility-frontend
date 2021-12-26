import * as Yup from 'yup';
import type { SchemaOf, BaseSchema } from 'yup';
import validateData from '../utils/validator';

interface UserData {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

async function validateCreateUser(userData: UserData) {
  const schema: SchemaOf<UserData> = Yup.object().shape({
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

  const validation = await validateData(userData, schema);
  return validation;
}

export { validateCreateUser };
