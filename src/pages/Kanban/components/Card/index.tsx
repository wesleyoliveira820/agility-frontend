import { Draggable } from 'react-beautiful-dnd';

import convertDate from '../../../../utils/convert-date-to-string';

import { Container } from './styles';

import dotsHorizontal from '../../../../assets/kanban/dots-horizontal.svg';
import calendar from '../../../../assets/kanban/calendar.svg';
import { Card as CardProps } from '../../../../contexts/project/types';

function Card({
  id,
  title,
  created_at,
  position,
}: CardProps) {
  return (
    <Draggable draggableId={id} index={position}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <header>
            <div />
            <button type="button">
              <img src={dotsHorizontal} alt="Mais" />
            </button>
          </header>
          <div id="card-content">
            <span>
              {title}
            </span>
          </div>
          <footer>
            <div id="card-footer-calendar">
              <img src={calendar} alt="Calendário" />
              <span>{convertDate(created_at)}</span>
            </div>
          </footer>
        </Container>
      )}
    </Draggable>
  );
}

export default Card;
