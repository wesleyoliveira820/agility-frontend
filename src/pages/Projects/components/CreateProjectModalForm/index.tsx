import { useRef, useEffect } from 'react';
import type { FormHandles } from '@unform/core';

import InputText from '../../../../components/InputText';
import Textarea from '../../../../components/Textarea';
import Button from '../../../../components/Button';
import { ModalForm } from '../../../../components/ModalForm';
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
  isOpen?: boolean;
}

function CreateProjectModalForm({
  onClose,
  onSubmit,
  isLoading,
  errors,
  isOpen,
}: CreateProjectModalFormProps) {
  const formRef = useRef<FormHandles>(null);

  const onSubmitForm = async (projectPayload: FormProps) => {
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
    <ModalForm
      formRef={formRef}
      modalTitle="Novo projeto"
      isOpen={isOpen}
      onSubmit={onSubmitForm}
      onClose={onClose}
    >
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
    </ModalForm>
  );
}

export { CreateProjectModalForm };
