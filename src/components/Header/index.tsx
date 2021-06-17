import { useState } from 'react';
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
import ModalSettings from './ModalSettings';
import { useProject } from '../../contexts/project-context';

interface IHeaderProps {
  toggleInviteModal?: () => void;
}

function Header({ toggleInviteModal }: IHeaderProps) {
  const { user } = useAuth();
  const { project } = useProject();
  const [toggleModalSettings, setToggleModalSettings] = useState(false);

  function handleToggleModalsettings() {
    setToggleModalSettings(!toggleModalSettings);
  }

  return (
    <>
      <Container>
        <div id="logo-title-project">
          <LinkStyled to="/projects">
            <img src={logo} alt="Agility" />
          </LinkStyled>
          {project?.title && (
          <>
            <span>-</span>
            <h6 id="title-project">{project.title}</h6>
          </>
          )}
        </div>
        <div id="tools">
          <div id="project-info-actions">
            {project?.my_role?.slug === 'admin' && (
            <Button
              title="Adicionar membro"
              small
              onClick={toggleInviteModal}
            />
            )}
            {project?.my_role?.slug === 'admin' && <div id="divider" />}
          </div>
          <ButtonSetting
            type="button"
            onClick={handleToggleModalsettings}
            showModal={toggleModalSettings}
          >
            <img src={settings} alt="Configurações" />
          </ButtonSetting>
          <Avatar
            size="medium"
            initial_name={user.initial_name}
            bg={user.color_name}
          />
        </div>
      </Container>
      {toggleModalSettings && <ModalSettings />}
    </>
  );
}

export default Header;
