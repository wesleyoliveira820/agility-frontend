import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import List from '../List';
import AddListForm from '../addListForm';
import { ProjectContext } from '../../../../contexts/project/context';

import { Container, ButtonAddList } from './styles';

function Board() {
  const lists = useContextSelector(ProjectContext, (state) => state.lists);
  const [showListForm, setShowListForm] = useState(false);

  function toggleListForm() {
    setShowListForm(!showListForm);
  }

  return (
    <Container>
      {lists?.map((list) => (
        <List
          key={list.id}
          {...list}
        />
      ))}
      {showListForm ? (
        <AddListForm
          onClose={toggleListForm}
        />
      ) : (
        <ButtonAddList type="button" onClick={toggleListForm}>
          <span>+ Adicionar lista</span>
        </ButtonAddList>
      )}
    </Container>
  );
}

export default Board;
