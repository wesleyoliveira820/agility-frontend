import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import List from '../List';
import AddListForm from '../addListForm';

import { Container, ButtonAddList } from './styles';
import { useProject } from '../../../contexts/project-context';

interface IParamProps {
  projectId: string;
}

function Board() {
  const { projectId } = useParams<IParamProps>();
  const { getCurrentProject, lists } = useProject();
  const [showListForm, setShowListForm] = useState(false);

  function toggleListForm() {
    setShowListForm(!showListForm);
  }

  useEffect(() => {
    getCurrentProject(projectId);
  }, []);

  return (
    <Container>
      {lists.map((list) => (
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
