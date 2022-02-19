interface ProjectProps {
  id: string;
  title: string;
  description?: string;
}

export interface ProjectCardProps {
  project: ProjectProps;
}
