import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Helmet } from 'react-helmet-async';
import List from '../List';
import AddListForm from '../addListForm';
import { ProjectContext } from '../../../../contexts/project/context';
import { MoveCardProps } from '../../../../contexts/project/types';

import { Container, ButtonAddList } from './styles';
import { moveCardAction } from '../../../../contexts/project/actions';
import api from '../../../../services/api';

function Board() {
  const lists = useContextSelector(ProjectContext, (state) => state.lists);
  const project = useContextSelector(ProjectContext, (state) => state.project);
  const dispatch = useContextSelector(ProjectContext, (state) => state.dispatch);

  const [showListForm, setShowListForm] = useState(false);

  function toggleListForm() {
    setShowListForm(!showListForm);
  }

  async function putMoveCardRequest({ from_list, to_list, card_id }: MoveCardProps) {
    await api.put(`/board/move-cards/${card_id}`, {
      from_list,
      to_list,
      project_id: project.id,
    });
  }

  function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const listsAreTheSame = destination.droppableId === source.droppableId;

    if (listsAreTheSame) return;

    const requestParams: MoveCardProps = {
      from_list: {
        list_id: source.droppableId,
        position: source.index,
      },
      to_list: {
        list_id: destination.droppableId,
        position: destination.index,
      },
      card_id: draggableId,
    };

    dispatch(moveCardAction(requestParams));
    putMoveCardRequest(requestParams);
  }

  return (
    <>
      <Helmet>
        {project && (
          <title>
            {project.title}
            {' '}
            | Agility
          </title>
        )}
      </Helmet>
      <DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>
    </>
  );
}

export default Board;
