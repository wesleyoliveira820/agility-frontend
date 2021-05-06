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
        <main id="body-content-bg" />
        <div id="body-padding-content">
          {children}
        </div>
      </Content>
    </Container>
  );
}

export default AuthPage;
