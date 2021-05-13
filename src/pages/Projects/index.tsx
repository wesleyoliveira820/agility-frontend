import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import type { AxiosError } from 'axios';
import axios from '../../services/api';
import { createProjectValidator } from '../../validators/project';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Form from './Form';
import ProjectCard from './ProjectCard';
import ModalForm from './ModalForm';

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
  message: string;
}

function Projects() {
  const [projects, setProjects] = useState<IProjectProps[]>([]);
  const [formError, setFormError] = useState<IFormErrorProps>({});
  const [showModal, setShowModal] = useState(false);

  async function validateFormData(projectPayload: IFormProps) {
    const validation = await createProjectValidator(projectPayload);

    if (validation) {
      return setFormError(validation);
    }

    return true;
  }

  async function createProjectInApi(projectPayload: IFormProps) {
    try {
      const response = await axios.post('projects', projectPayload);

      return response.data;
    } catch (_error) {
      const { response }: AxiosError<IApiErrorResponse[]> = _error;

      if (response?.status === 409) {
        return setFormError({ title: response.data[0].message });
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
  }

  return (
    <>
      <Helmet>
        <title>Agility</title>
      </Helmet>
      <Header />
      {projects.length > 0 ? (
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
      ) : (
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
