import { ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';
import { Container } from './styles';

interface ILinkProps extends LinkProps {
  children: ReactNode;
}

function Link({ children, ...rest }: ILinkProps) {
  return <Container {...rest}>{children}</Container>;
}

export default Link;
