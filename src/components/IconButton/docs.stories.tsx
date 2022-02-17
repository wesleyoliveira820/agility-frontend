import { Story, Meta } from '@storybook/react';
import { IconButtonProps } from './icon-button.types';
import { IconButton } from './index';

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Default button',
  size: 'medium',
};

export const Small = Template.bind({});

Small.args = {
  title: 'Small button',
  size: 'small',
};

export default {
  title: 'Form/Buttons/With Icon',
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component: 'Este é o componente de botão com ícone customizável, você pode usar todas as propriedades da tag button normalmente + as propriedades customizáveis.',
      },
    },
  },
  argTypes: {
    size: {
      description: 'Define o tamanho do botão, por padrão o tamanho é "medium".',
    },
    title: {
      description: 'Define o texto exibido no botão.',
    },
    Icon: {
      description: 'Recebe um ícone no formato de função com react-icons',
    },
  },
} as Meta;
