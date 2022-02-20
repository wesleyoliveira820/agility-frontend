import { useState, FormEvent } from 'react';
import { useContextSelector } from 'use-context-selector';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import windowClose from '../../../../assets/kanban/window-close.svg';
import api from '../../../../services/api';
import { ProjectContext } from '../../../../contexts/project/context';
import { Container } from './styles';

interface IAddListFormProps {
  onClose: () => void;
}

function AddListForm({ onClose }: IAddListFormProps) {
  const project = useContextSelector(ProjectContext, (state) => state.project);
  const [input, setInput] = useState('');

  async function onSubmitForm(event: FormEvent) {
    event.preventDefault();

    if (!input) return;

    setInput('');

    try {
      await api.post('/projects/lists', {
        title: input,
        project_id: project.id,
      });
    } catch (error: any) {
      const { response }: AxiosError = error;

      toast.error(response?.data[0].message);
    }
  }

  function onChangeInput(event: FormEvent<HTMLInputElement>) {
    setInput(event.currentTarget.value);
  }

  return (
    <Container onSubmit={onSubmitForm}>
      <input
        type="text"
        placeholder="Nome da lista"
        onChange={onChangeInput}
        value={input}
        autoFocus
      />
      <div>
        <button type="submit">Criar</button>
        <button type="button" onClick={onClose}>
          <img src={windowClose} alt="close" />
        </button>
      </div>
    </Container>
  );
}

export default AddListForm;
