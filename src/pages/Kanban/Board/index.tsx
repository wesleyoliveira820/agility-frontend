import { useState, useEffect } from 'react';

import List from '../List';
import AddListForm from '../addListForm';

import { Container, ButtonAddList } from './styles';

interface IListProjectProps {
  id: string;
  title: string;
  create_cards: boolean;
  created_at: Date;
  updated_at: Date;
}

interface IBoardProps {
  project_id: string;
  lists: IListProjectProps[];
}

function Board({ project_id, lists }: IBoardProps) {
  const [listsOfProject, setListsOfProject] = useState([] as IListProjectProps[]);
  const [showListForm, setShowListForm] = useState(false);

  function toggleListForm() {
    setShowListForm(!showListForm);
  }

  function addNewList(list: IListProjectProps) {
    setListsOfProject([...listsOfProject, list]);
  }

  useEffect(() => {
    setListsOfProject(lists);
  }, [lists]);

  return (
    <Container>
      {listsOfProject && listsOfProject.map((list) => (
        <List
          key={list.id}
          title={list.title}
          addCardButton={list.create_cards}
        />
      ))}
      {showListForm ? (
        <AddListForm
          project_id={project_id}
          onClose={toggleListForm}
          onNewList={addNewList}
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
