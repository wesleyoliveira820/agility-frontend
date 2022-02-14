import * as Yup from 'yup';
import type { SchemaOf, BaseSchema } from 'yup';
import validateData from '../utils/validator';

interface ValidatorProps {
  password: string;
  password_confirmation?: string;
}

async function resetPasswordValidator(payload: ValidatorProps) {
  const schema: SchemaOf<ValidatorProps> = Yup.object().shape({
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

  const validation = await validateData(payload, schema);
  return validation;
}

export { resetPasswordValidator };
