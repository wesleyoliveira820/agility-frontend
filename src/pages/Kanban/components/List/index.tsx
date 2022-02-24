import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Card from '../Card';
import AddCardForm from '../addCardForm';
import type { List as ListProps } from '../../../../contexts/project/types';
import dotsVerticalWhite from '../../../../assets/kanban/dots-vertical-white.svg';

import { Container, Header, Content } from './styles';

function List({
  id,
  title,
  create_cards = false,
  cards,
}: ListProps) {
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  function toggleShowCardForm() {
    setShowAddCardForm(!showAddCardForm);
  }

  return (
    <Droppable droppableId={id} type="TASK">
      {(provided) => (
        <Container>
          <Header>
            <span id="list-title">
              <h6>{title}</h6>
              <p>{cards?.length || '0'}</p>
            </span>
            <span id="list-actions">
              {create_cards && (
                <button
                  type="button"
                  id="button-add-card"
                  onClick={toggleShowCardForm}
                >
                  <span>+</span>
                </button>
              )}
              <button id="button-more" type="button">
                <img src={dotsVerticalWhite} alt="Mais" />
              </button>
            </span>
          </Header>

          <Content
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {showAddCardForm && (
            <AddCardForm
              onClose={toggleShowCardForm}
            />
            )}
            {cards && cards.map((card, index) => (
              <Card key={card.id} {...card} position={index} />
            ))}
          </Content>
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
}

export default List;
