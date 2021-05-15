import { Story, Meta } from '@storybook/react';
import Avatar, { IAvatarProps } from './index';

const Template: Story<IAvatarProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});

export const Small = Template.bind({});

Small.args = {
  size: 'small',
};

export const Large = Template.bind({});

Large.args = {
  size: 'large',
};

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'Componente de representação do perfil do usuário.',
      },
    },
  },
  argTypes: {
    size: {
      description: 'Define o tamanho do componente, por padrão o tamanho é "medium".',
    },
    initial_name: {
      description: 'Primeira letra do nome do usuário que é fornecido pela API.',
    },
    withBorder: {
      description: 'Caso seja "true" coloca uma bora branca em volta do componente.',
    },
    bg: {
      description: 'Seta a cor de fundo do compoente, esse valor é fornecido pela API.',
    },
  },
} as Meta;
