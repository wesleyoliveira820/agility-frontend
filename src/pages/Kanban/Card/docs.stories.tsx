import { Story, Meta } from '@storybook/react';
import Card from './index';
import type { ICardProps } from '../../../contexts/project-context';

const Template: Story<ICardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  created_at: 'Jun 12 11:06:58 +00',
};

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Componente de card.',
      },
    },
  },
  argTypes: {
    id: {
      description: 'Id do card.',
    },
    title: {
      description: 'Título do card.',
    },
    created_at: {
      description: 'Data de criação do card.',
    },
  },
} as Meta;
