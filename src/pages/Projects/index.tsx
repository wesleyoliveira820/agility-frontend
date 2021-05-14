import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import type { AxiosError } from 'axios';

import axios from '../../services/api';
import { createProjectValidator } from '../../validators/project';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Form from './Form';
import ProjectCard from './ProjectCard';
import ModalForm from './ModalForm';
import ProjectSkeleton from './ProjectSkeleton';

import { ProjectContainer, ProjectContent } from './styles';

interface IProjectProps {
  id: string;
  title: string;
  description?: string;
}

interface IFormProps {
  title: string;
  description?: string;
}

interface IFormErrorProps {
  [key: string]: string;
}

interface IApiErrorResponse {
  field: string;
  message: string;
}

function Projects() {
  const [projects, setProjects] = useState<IProjectProps[]>([]);
  const [formError, setFormError] = useState<IFormErrorProps>({});
  const [showModal, setShowModal] = useState(false);
  const [notHasProjects, setNoHasProjects] = useState(false);

  async function validateFormData(projectPayload: IFormProps) {
    const validation = await createProjectValidator(projectPayload);

    if (validation) {
      setFormError(validation);
      return false;
    }

    return true;
  }

  async function createProjectInApi(projectPayload: IFormProps): Promise<IProjectProps | void> {
    try {
      const response = await axios.post('projects', projectPayload);

      return response.data;
    } catch (_error) {
      const { response }: AxiosError<IApiErrorResponse[]> = _error;

      if (response?.data[0].message) {
        const { field, message } = response.data[0];
        return setFormError({ [field]: message });
      }

      return setFormError({});
    }
  }

  function toggleModal() {
    if (formError) setFormError({});
    setShowModal(!showModal);
  }

  async function onSubmitForm(projectPayload: IFormProps) {
    const validation = await validateFormData(projectPayload);

    if (!validation) return;

    const project = await createProjectInApi(projectPayload);

    if (!project) return;

    if (showModal) toggleModal();

    setProjects([project, ...projects]);

    setNoHasProjects(false);
  }

  async function getProjectsInApi() {
    const response = await axios.get('projects');

    if (response.data.length === 0) {
      return setNoHasProjects(true);
    }

    setProjects(response.data);
  }

  useEffect(() => {
    getProjectsInApi();
  }, []);

  return (
    <>
      <Helmet>
        <title>Agility</title>
      </Helmet>
      <Header />
      {projects.length === 0 && !notHasProjects && (
        <ProjectSkeleton />
      )}
      {projects.length > 0 && (
        <ProjectContainer>
          <ProjectContent>
            <header>
              <h6>Meus projetos</h6>
              <Button
                onClick={toggleModal}
                title="Novo projeto"
                small
              />
            </header>
            <ul>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </ul>
          </ProjectContent>
        </ProjectContainer>
      )}
      {notHasProjects && (
        <Form
          onSubmit={onSubmitForm}
          errors={formError}
        />
      )}
      {showModal && (
        <ModalForm
          onSubmit={onSubmitForm}
          onClose={toggleModal}
          errors={formError}
        />
      )}
    </>
  );
}

export default Projects;
