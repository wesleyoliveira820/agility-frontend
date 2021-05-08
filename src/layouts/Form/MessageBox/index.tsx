import { Container } from './styles';

interface IMessageProps {
  type: 'success' | 'error';
  text: string;
}

function MessageBox({ type, text }: IMessageProps) {
  return (
    <Container type={type}>
      <p>{text}</p>
    </Container>
  );
}

export default MessageBox;
