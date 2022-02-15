import { useRef } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';

import InputText from '../../../../components/InputText';
import Textarea from '../../../../components/Textarea';
import Button from '../../../../components/Button';

import { Container, Form } from './styles';
import logo from '../../../../assets/projects/logo.svg';
import { createProjectValidator } from '../../../../validators/project';

interface FormProps {
  title: string;
  description?: string;
}

interface CreateFirstProjectFormProps {
  onSubmit: (project: FormProps) => void;
  isLoading: boolean;
}

function CreateFirstProjectForm({ onSubmit, isLoading }: CreateFirstProjectFormProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmitForm: SubmitHandler<FormProps> = async (projectPayload) => {
    const validation = await createProjectValidator(projectPayload);

    if (validation) {
      return formRef.current?.setErrors(validation);
    }

    formRef.current?.setErrors({});

    onSubmit(projectPayload);
  };

  return (
    <Container>
      <img src={logo} alt="Agility" />
      <h5>Crie um novo projeto para começar.</h5>

      <Form ref={formRef} onSubmit={handleSubmitForm}>
        <InputText
          name="title"
          placeholder="Nome do projeto"
          spellCheck
          bg="secondary"
        />
        <Textarea
          name="description"
          spellCheck
          placeholder="Descrição"
          maxLength={120}
          bg="secondary"
        />
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          title="Criar projeto"
        />
      </Form>
    </Container>
  );
}

export { CreateFirstProjectForm };
