import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';

import InputText from '../../../components/InputText';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';

import { Container, Form } from './styles';
import logo from '../../../assets/projects/logo.svg';

interface IFormProps {
  title: string;
  description?: string;
}

interface IFormErrorProps {
  [key: string]: string;
}

interface IFormProjectsProps {
  onSubmit: (project: IFormProps) => void;
  errors: IFormErrorProps;
}

function FormProjects({ onSubmit, errors }: IFormProjectsProps) {
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm: SubmitHandler<IFormProps> = async (projectPayload) => {
    formRef.current?.setErrors({});

    setIsLoading(true);

    onSubmit(projectPayload);
  };

  useEffect(() => {
    formRef.current?.setErrors(errors || {});
    setIsLoading(false);
  }, [errors]);

  return (
    <Container>
      <img src={logo} alt="Agility" />
      <h5>Crie um novo projeto para começar.</h5>

      <Form ref={formRef} onSubmit={onSubmitForm}>
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
          title="Criar projeto"
          isLoading={isLoading}
          disabled={isLoading}
        />
      </Form>
    </Container>
  );
}

export default FormProjects;
