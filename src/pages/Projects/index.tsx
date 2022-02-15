import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMutation, useQuery } from 'react-query';
import { AxiosError } from 'axios';

import Header from '../../components/Header';
import Button from '../../components/Button';
import { CreateFirstProjectForm } from './components/CreateFirstProjectForm';
import ProjectCard from './components/ProjectCard';
import { CreateProjectModalForm } from './components/CreateProjectModalForm';
import ProjectSkeleton from './components/ProjectSkeleton';

import api from '../../services/api';
import { queryClient } from '../../services/query-client';

import { ProjectContainer, ProjectContent } from './styles';

interface FormProps {
  title: string;
  description?: string;
}

interface ProjectProps {
  id: string;
  title: string;
  description?: string;
}

function Projects() {
  const [showCreateProjectFormModal, setShowCreateProjectFormModal] = useState(false);

  function toggleModal() {
    setShowCreateProjectFormModal(!showCreateProjectFormModal);
  }

  async function getProjectsRequest() {
    const response = await api.get('projects');
    return response.data;
  }

  async function postProjectRequest(projectData: FormProps) {
    const response = await api.post('projects', projectData);
    return response.data;
  }

  async function handleCreateNewProject(projectData: FormProps) {
    const newProject = await postProjectRequest(projectData);

    if (showCreateProjectFormModal) {
      toggleModal();
    }

    return newProject;
  }

  const projects = useQuery('projects', getProjectsRequest, {
    refetchOnWindowFocus: false,
  });

  const changeProjects = useMutation<ProjectProps[], AxiosError, FormProps>('projectsMutation', handleCreateNewProject, {
    onSuccess: (data) => {
      queryClient.setQueryData('projects', [data, ...projects.data]);
    },
  });

  return (
    <>
      <Helmet>
        <title>Meus projetos | Agility</title>
      </Helmet>
      <Header />
      {projects.isLoading && (
        <ProjectSkeleton />
      )}
      {projects.data?.length > 0 && (
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
              {projects.data.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </ul>
          </ProjectContent>
        </ProjectContainer>
      )}
      {projects.data?.length === 0 && !projects.isLoading && (
        <CreateFirstProjectForm
          onSubmit={changeProjects.mutate}
          isLoading={changeProjects.isLoading}
        />
      )}
      {showCreateProjectFormModal && (
        <CreateProjectModalForm
          onSubmit={changeProjects.mutate}
          onClose={toggleModal}
          errors={changeProjects.error?.response?.data}
          isLoading={changeProjects.isLoading}
        />
      )}
    </>
  );
}

export default Projects;
