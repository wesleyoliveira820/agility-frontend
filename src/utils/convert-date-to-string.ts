import { formatDistanceToNow, subHours } from 'date-fns';
import localePt from 'date-fns/locale/pt-BR';

function convertDate(date: string) {
  const newDate = subHours(new Date(date), 3);

  const convertedDate = formatDistanceToNow(newDate, {
    locale: localePt,
  });

  return `Há ${convertedDate}`;
}

export default convertDate;
