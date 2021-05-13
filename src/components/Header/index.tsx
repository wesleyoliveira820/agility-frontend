import Avatar from '../Avatar';
import { useAuth } from '../../contexts/auth-context';

import {
  Container,
  LinkStyled,
  ButtonSetting,
} from './styles';

import logo from '../../assets/global/logo.svg';
import settings from '../../assets/global/settings.svg';

function Header() {
  const { user } = useAuth();

  return (
    <Container>
      <div id="logo-title-project">
        <LinkStyled to="/projects">
          <img src={logo} alt="Agility" />
        </LinkStyled>
      </div>
      <div id="tools">
        <ButtonSetting type="button">
          <img src={settings} alt="Configurações" />
        </ButtonSetting>
        <Avatar
          size="medium"
          initial_name={user.initial_name}
          bg={user.color_name}
        />
      </div>
    </Container>
  );
}

export default Header;
