import { ReactNode } from 'react';
import { Container } from './styles';

export interface IFormProps{
  children: ReactNode;
}

function Form({
  children,
}: IFormProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default Form;
