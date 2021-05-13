import { memo } from 'react';
import { LinkStyled, Content } from './styles';

interface IProjectProps {
  project: {
    id: string;
    title: string;
    description?: string;
  }
}

function ProjectCard({ project }: IProjectProps) {
  return (
    <LinkStyled
      to={`/project/${project.id}`}
    >
      <Content>
        <p>{project.title}</p>
        <span>{project.description}</span>
      </Content>
    </LinkStyled>
  );
}

export default memo(ProjectCard);
