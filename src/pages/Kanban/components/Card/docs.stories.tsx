import { Story, Meta } from '@storybook/react';
import { Droppable } from 'react-beautiful-dnd';

import type { Card as CardProps } from '../../../../contexts/project/types';
import Card from './index';

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  created_at: 'Jun 12 11:06:58 +00',
};

export default {
  title: 'Data/Task Card',
  component: Card,
  decorators: [
    (Component) => (
      <Droppable droppableId="123">
        {() => (
          <Component />
        )}
      </Droppable>
    ),
  ],
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
