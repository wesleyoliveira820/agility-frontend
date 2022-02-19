import { memo } from 'react';

import { ProjectCardProps } from './project-card.types';
import { LinkStyled, Content } from './styles';

function ProjectCard({ project }: ProjectCardProps) {
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
