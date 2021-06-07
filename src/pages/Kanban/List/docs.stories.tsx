import { Story, Meta } from '@storybook/react';
import List, { IListProps } from './index';

const Template: Story<IListProps> = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Lista 1',
};

export const WithAddCardButton = Template.bind({});
WithAddCardButton.args = {
  title: 'Tarefas',
  addCardButton: true,
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
    title: {
      description: 'Define o nome da lista. Esta propriedade é obrigatória',
    },
    addCardButton: {
      description: 'Quando setado como true mostra um botão que permite criar cards em uma determinada lista. Por padrão é false.',
    },
  },
} as Meta;
