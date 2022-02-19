import { Story, Meta } from '@storybook/react';

import { ButtonProps } from './button.types';
import Button from './index';

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Default Button',
};

export const Disabled = Template.bind({});

Disabled.args = {
  title: 'Disabled Button',
  disabled: true,
};

export const DisabledLoading = Template.bind({});

DisabledLoading.args = {
  isLoading: true,
  disabled: true,
};

export const Small = Template.bind({});

Small.args = {
  title: 'Small Button',
  small: true,
};

export default {
  title: 'Form/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Este é o componente de botão customizável, você pode usar todas as propriedades da tag button normalmente + as propriedades customizáveis.',
      },
    },
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Evento disparado ao clicar o botão.',
    },
    title: {
      description: 'Texto a ser mostrado dentro do botão.',
    },
    medium: {
      description: 'Caso seja true seta o tamanho do botão como médio, este é o valor padrão.',
      defaultValue: true,
    },
    small: {
      description: 'caso seja true seta o tamanho do botão como pequeno.',
      defaultValue: false,
    },
    disabled: {
      description: 'Caso seja true desabilita o botão.',
      control: 'boolean',
      defaultValue: false,
    },
    isLoading: {
      description: 'Caso seja true e disabled também seja true exibe um load spinner no lugar do texto.',
      defaultValue: false,
    },
  },
} as Meta;
