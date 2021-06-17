import { Story, Meta } from '@storybook/react';
import type { IListProps } from '../../../contexts/project-context';
import List from './index';

const Template: Story<IListProps> = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Lista 1',
};

export const WithAddCardButton = Template.bind({});
WithAddCardButton.args = {
  title: 'Tarefas',
  create_cards: true,
};

const cards = [
  {
    id: '1',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    created_at: 'Jun 12 11:06:58 +00',
  },
  {
    id: '2',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    created_at: 'Jun 12 11:06:58 +00',
  },
  {
    id: '3',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    created_at: 'Jun 12 11:06:58 +00',
  },
  {
    id: '4',
    title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    created_at: 'Jun 12 11:06:58 +00',
  },
];

export const WithCards = Template.bind({});
WithCards.args = {
  ...WithAddCardButton.args,
  cards,
};

export default {
  title: 'Components/List',
  component: List,
  parameters: {
    docs: {
      description: {
        component: 'Componente de lista de cards.',
      },
    },
  },
  argTypes: {
    id: {
      description: 'Id da lista.',
    },
    title: {
      description: 'Define o nome da lista. Esta propriedade é obrigatória',
    },
    create_cards: {
      description: 'Quando setado como true mostra um botão que permite criar cards em uma determinada lista. Por padrão é false.',
    },
    cards: {
      description: 'Essa propriedade recebe um array de propriedades que formam os cards da lists.',
    },
  },
} as Meta;
