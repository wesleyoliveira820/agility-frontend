import Avatar from '../Avatar';
import { useAuth } from '../../contexts/auth-context';

import {
  Container,
  LinkStyled,
  ButtonSetting,
} from './styles';

import logo from '../../assets/global/logo.svg';
import settings from '../../assets/global/settings.svg';
import Button from '../Button';

interface IHeaderProps {
  title?: string;
  myRole?: string;
}

function Header({ title, myRole }: IHeaderProps) {
  const { user } = useAuth();

  return (
    <Container>
      <div id="logo-title-project">
        <LinkStyled to="/projects">
          <img src={logo} alt="Agility" />
        </LinkStyled>
        {title && (
          <>
            <span>-</span>
            <h6 id="title-project">{title}</h6>
          </>
        )}
      </div>
      <div id="tools">
        <div id="project-info-actions">
          {myRole === 'admin' && <Button title="Adicionar membro" small />}
          {myRole === 'admin' && <div id="divider" />}
        </div>
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
