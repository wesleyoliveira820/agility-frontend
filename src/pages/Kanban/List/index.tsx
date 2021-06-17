import { useState } from 'react';

import Card from '../Card';
import AddCardForm from '../addCardForm';
import type { IListProps } from '../../../contexts/project-context';

import { Container, Header, Content } from './styles';

import dotsVerticalWhite from '../../../assets/kanban/dots-vertical-white.svg';

function List({
  title,
  create_cards = false,
  cards,
}: IListProps) {
  const [showAddCardForm, setShowAddCardForm] = useState(false);

  function toggleShowCardForm() {
    setShowAddCardForm(!showAddCardForm);
  }

  return (
    <Container>
      <Header>
        <span id="list-title">
          <h6>{title}</h6>
          <p>{cards?.length || '0'}</p>
        </span>
        <span id="list-actions">
          {create_cards
            && (
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
      <Content>
        {showAddCardForm && (
          <AddCardForm
            onClose={toggleShowCardForm}
          />
        )}
        {cards && cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </Content>
    </Container>
  );
}

export default List;
