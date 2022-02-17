import { Container } from './styles';
import errorRequestImg from '../../assets/global/error_request.svg';
import Button from '../Button';

interface ErrorRequestProps {
  message: string;
  statusError?: number;
}

function ErrorRequest({ message, statusError }: ErrorRequestProps) {
  return (
    <Container>
      <img src={errorRequestImg} alt="Ops...Algo deu errado." />
      {statusError && (
        <strong>
          Erro
          {' '}
          {statusError}
        </strong>
      )}
      <p>{message}</p>
      <Button title="Tentar novamente" onClick={() => window.location.reload()} />
    </Container>
  );
}

export { ErrorRequest };
