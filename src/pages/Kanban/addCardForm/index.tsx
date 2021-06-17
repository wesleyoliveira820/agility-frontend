import { useRef } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';

import InputText from '../../../components/InputText';

import { Container, Form } from './styles';

import closeForm from '../../../assets/kanban/window-close.svg';
import { useProject } from '../../../contexts/project-context';

interface IAddCardFormProps {
  onClose: () => void;
}

interface IFormProps {
  title: string;
}

function AddCardForm({
  onClose,
}: IAddCardFormProps) {
  const formRef = useRef<FormHandles>(null);
  const { addNewCard } = useProject();

  const onSubmitForm: SubmitHandler<IFormProps> = async ({ title }) => {
    if (!title) return;

    addNewCard(title);

    formRef.current?.clearField('title');
  };

  return (
    <Container>
      <Form ref={formRef} onSubmit={onSubmitForm}>
        <InputText
          name="title"
          placeholder="Nova tarefa"
          bg="secondary"
          autoFocus
          autoComplete="off"
        />
        <button type="button" onClick={onClose}>
          <img src={closeForm} alt="Fechar formulário" />
        </button>
      </Form>
      <span>
        Precione &quot;Enter&quot; para adicionar uma nova tarefa
      </span>
    </Container>
  );
}

export default AddCardForm;
