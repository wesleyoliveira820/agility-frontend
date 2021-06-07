import { useState, FormEvent } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

import { toast } from 'react-toastify';
import { Container } from './styles';

import windowClose from '../../../assets/kanban/window-close.svg';
import axios from '../../../services/api';

interface IListProjectProps {
  id: string;
  title: string;
  create_cards: boolean;
  created_at: Date;
  updated_at: Date;
}

interface IAddListFormProps {
  project_id: string;
  onClose: () => void;
  onNewList: (object: IListProjectProps) => void;
}

interface IApiError {
  message: string;
}

type ApiSuccess = AxiosResponse<IListProjectProps>;

type ApiError = AxiosError<IApiError[]>

function AddListForm({ project_id, onClose, onNewList }: IAddListFormProps) {
  const [input, setInput] = useState('');

  async function createListInApi() {
    try {
      const response: ApiSuccess = await axios.post('projects/lists', {
        title: input,
        project_id,
      });

      onNewList(response.data);
    } catch (_error) {
      const { response }: ApiError = _error;

      toast.error(response?.data[0].message);
    }
  }

  async function onSubmitForm(event: FormEvent) {
    event.preventDefault();

    if (!input) return;

    await createListInApi();

    setInput('');
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
