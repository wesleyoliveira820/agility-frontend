import { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import type { FormHandles, SubmitHandler } from '@unform/core';

import InputText from '../../../components/InputText';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';

import FormLayout from '../../../layouts/Form';

import { Container } from './styles';

interface IFormErrorProps {
  [key: string]: string;
}

interface IFormProps {
  title: string;
  description?: string;
}

interface IModalFormProps {
  onClose?: () => void;
  onSubmit: (projectPayload: IFormProps) => void;
  errors?: IFormErrorProps;
}

function ModalForm({ onClose, onSubmit, errors }: IModalFormProps) {
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
      <FormLayout>
        <header id="header-form">
          <h6>Novo projeto</h6>
        </header>

        <Form ref={formRef} onSubmit={onSubmitForm}>
          <InputText
            name="title"
            placeholder="Nome do projeto"
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
    </Container>
  );
}

ModalForm.defaultProps = {
  onClose: () => {},
};

export default ModalForm;
