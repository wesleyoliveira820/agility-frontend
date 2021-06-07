import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import type { AxiosResponse } from 'axios';

import axios from '../../services/api';

import Header from '../../components/Header';
import ModalInviteMember from './ModalInviteMember';
import Board from './Board';

interface IParamProps {
  projectId: string;
}

interface IListProjectProps {
  id: string;
  title: string;
  create_cards: boolean;
  created_at: Date;
  updated_at: Date;
}

interface IRoleProjectProps {
  id: string;
  slug: string;
}

interface IProjectProps {
  id: string;
  title: string;
  lists: IListProjectProps[];
  my_role: IRoleProjectProps;
}

type SuccessApi = AxiosResponse<IProjectProps>;

function Kanban() {
  const { projectId } = useParams<IParamProps>();
  const [project, setProject] = useState({} as IProjectProps);
  const [toggleInviteModal, setToggleInviteModal] = useState(false);

  async function getProjectInApi() {
    const response: SuccessApi = await axios.get(`projects/${projectId}`);

    setProject(response.data);
  }

  useEffect(() => {
    getProjectInApi();
  }, []);

  return (
    <>
      <Helmet>
        {project.title && (
        <title>
          {project.title}
          {' '}
          | Agility
        </title>
        )}
      </Helmet>
      <Header
        title={project.title}
        myRole={project?.my_role?.slug}
        toggleInviteModal={() => setToggleInviteModal(true)}
      />
      <Board lists={project.lists} project_id={projectId} />
      {toggleInviteModal && (
        <ModalInviteMember
          toggleInviteModal={() => setToggleInviteModal(false)}
        />
      )}
    </>
  );
}

export default Kanban;
