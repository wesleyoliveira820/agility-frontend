import { useState } from 'react';

import Header from '../../components/Header';
import ModalInviteMember from './components/ModalInviteMember';
import Board from './components/Board';
import { Loading } from './components/Loading';
import { ProjectProvider } from '../../contexts/project/context';

function Kanban() {
  const [toggleInviteModal, setToggleInviteModal] = useState(false);

  return (
    <ProjectProvider>
      <Header
        toggleInviteModal={() => setToggleInviteModal(true)}
      />
      <Loading />
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
