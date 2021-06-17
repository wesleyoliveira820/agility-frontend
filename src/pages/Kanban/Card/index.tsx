import convertDate from '../../../utils/convert-date-to-string';
import type { ICardProps } from '../../../contexts/project-context';

import { Container } from './styles';

import dotsHorizontal from '../../../assets/kanban/dots-horizontal.svg';
import calendar from '../../../assets/kanban/calendar.svg';

function Card({ title, created_at }: ICardProps) {
  return (
    <Container>
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
  );
}

export default Card;
