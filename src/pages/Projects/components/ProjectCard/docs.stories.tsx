import { Story, Meta } from '@storybook/react';

import { ProjectCardProps } from './project-card.types';
import ProjectCard from './index';

const Template: Story<ProjectCardProps> = (args) => <ProjectCard {...args} />;

export const Default = Template.bind({});

Default.args = {
  project: {
    id: '5e279032-141a-4474-857d-fe28e3af2704',
    title: 'Default card project',
    description: 'Project description',
  },
};

export default {
  title: 'Data/Project Card',
  component: ProjectCard,
  parameters: {
    docs: {
      description: {
        component: 'O componente de card do projeto é usado para exibir as informações básicas de um projeto em uma listagem.',
      },
    },
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ width: '300px' }}>
        <StoryComponent />
      </div>
    ),
  ],
} as Meta;
