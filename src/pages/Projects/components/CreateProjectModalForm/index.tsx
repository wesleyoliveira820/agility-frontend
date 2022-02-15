import { useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import type { FormHandles, SubmitHandler } from '@unform/core';

import { motion } from 'framer-motion';
import InputText from '../../../../components/InputText';
import Textarea from '../../../../components/Textarea';
import Button from '../../../../components/Button';

import FormLayout from '../../../../layouts/Form';

import { Container } from './styles';
import { createProjectValidator } from '../../../../validators/project';
import formatApiValidations from '../../../../utils/format-api-validations';

interface FormProps {
  title: string;
  description?: string;
}

interface ApiErrorProps {
  message: string;
  field: string;
}

interface CreateProjectModalFormProps {
  onClose?: () => void;
  onSubmit: (projectPayload: FormProps) => void;
  errors: ApiErrorProps[] | undefined;
  isLoading: boolean;
}

function CreateProjectModalForm({
  onClose, onSubmit, isLoading, errors,
}: CreateProjectModalFormProps) {
  const formRef = useRef<FormHandles>(null);

  const onSubmitForm: SubmitHandler<FormProps> = async (projectPayload) => {
    const validationErrors = await createProjectValidator(projectPayload);

    if (validationErrors) {
      return formRef.current?.setErrors(validationErrors);
    }

    formRef.current?.setErrors({});

    onSubmit(projectPayload);
  };

  useEffect(() => {
    if (errors) {
      const formattedErrors = formatApiValidations(errors);
      formRef.current?.setErrors(formattedErrors);
    }
  }, [errors]);

  return (
    <Container>
      <motion.div
        animate={{ scale: [0.8, 1] }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '408px',
          width: '100%',
        }}
      >
        <FormLayout>
          <header id="header-form">
            <h6>Novo projeto</h6>
          </header>

          <Form ref={formRef} onSubmit={onSubmitForm}>
            <InputText
              name="title"
              placeholder="Nome do projeto"
              autoFocus
            />
            <Textarea
              bg="primary"
              name="description"
              placeholder="Descrição"
            />
            <Button
              type="submit"
              title="Criar projeto"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </Form>

          <footer>
            <button
              type="button"
              id="button-close"
              onClick={onClose}
            >
              Cancelar
            </button>
          </footer>
        </FormLayout>
      </motion.div>
    </Container>
  );
}

export { CreateProjectModalForm };
