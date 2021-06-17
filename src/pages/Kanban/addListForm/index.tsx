import { useState, FormEvent } from 'react';

import { Container } from './styles';

import windowClose from '../../../assets/kanban/window-close.svg';
import { useProject } from '../../../contexts/project-context';

interface IAddListFormProps {
  onClose: () => void;
}

function AddListForm({ onClose }: IAddListFormProps) {
  const { addNewList } = useProject();
  const [input, setInput] = useState('');

  async function onSubmitForm(event: FormEvent) {
    event.preventDefault();

    if (!input) return;

    addNewList(input);

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
