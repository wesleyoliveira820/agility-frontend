import { Link } from 'react-router-dom';

import { Container, Button } from './styles';
import logo from '../../../assets/home/logo.svg';

function Header() {
  return (
    <Container>
      <div id="header-content">
        <img src={logo} alt="Agility" />
        <Link to="/login">
          <Button type="button">Entrar</Button>
        </Link>
      </div>
    </Container>
  );
}

export default Header;
