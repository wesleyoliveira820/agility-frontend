import { useState } from 'react';
import ProjectProvider from '../../contexts/project-context';

import Header from '../../components/Header';
import ModalInviteMember from './components/ModalInviteMember';
import Board from './components/Board';

function Kanban() {
  const [toggleInviteModal, setToggleInviteModal] = useState(false);

  return (
    <ProjectProvider>
      <Header
        toggleInviteModal={() => setToggleInviteModal(true)}
      />
      <Board />
      {toggleInviteModal && (
        <ModalInviteMember
          toggleInviteModal={() => setToggleInviteModal(false)}
        />
      )}
    </ProjectProvider>
  );
}

export default Kanban;
