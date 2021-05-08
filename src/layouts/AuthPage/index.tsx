import { ReactNode } from 'react';
import { Container, Content } from './styles';

import logo from '../../assets/authPage/logo.svg';

interface IAuthPageProps {
  children: ReactNode;
}

function AuthPage({ children }: IAuthPageProps) {
  return (
    <Container>
      <header>
        <div id="header-content-center">
          <img src={logo} alt="Agility" />
        </div>
      </header>
      <Content>
        {children}
      </Content>
    </Container>
  );
}

export default AuthPage;
