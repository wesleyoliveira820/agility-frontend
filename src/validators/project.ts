import * as Yup from 'yup';
import type { SchemaOf } from 'yup';
import validateData from '../utils/validator';

interface ValidatorProps {
  title: string;
  description?: string;
}

async function createProjectValidator(projectData: ValidatorProps) {
  const schema: SchemaOf<ValidatorProps> = Yup.object().shape({
    title: Yup.string().required('Este campo é obrigatório.'),
    description: Yup.string().max(120, 'O limite de caracteres foi excedido.'),
  });

  const validation = await validateData(projectData, schema);
  return validation;
}

export { createProjectValidator };
