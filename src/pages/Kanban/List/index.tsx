import { Container, Header, Content } from './styles';

import dotsVerticalWhite from '../../../assets/kanban/dots-vertical-white.svg';

export interface IListProps {
  title: string;
  addCardButton?: boolean;
  cards?: [];
}

function List({ title, addCardButton = false, cards }: IListProps) {
  return (
    <Container>
      <Header>
        <span id="list-title">
          <h6>{title}</h6>
          <p>{cards?.length || '0'}</p>
        </span>
        <span id="list-actions">
          {addCardButton
            && (
            <button type="button" id="button-add-card">
              <span>+</span>
            </button>
            )}
          <button id="button-more" type="button">
            <img src={dotsVerticalWhite} alt="Mais" />
          </button>
        </span>
      </Header>
      <Content />
    </Container>
  );
}

export default List;
