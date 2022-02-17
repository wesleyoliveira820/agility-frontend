import { Story, Meta } from '@storybook/react';
import { Form } from '@unform/web';

import InputText from './index';
import { InputProps } from './input-text.types';

const Template: Story<InputProps> = (args) => <InputText {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: 'default',
  placeholder: 'Default Input',
};

export const SecondaryBackground = Template.bind({});

SecondaryBackground.args = {
  name: 'secondaryType',
  placeholder: 'Secondary Type',
  bg: 'secondary',
};

export default {
  title: 'Form/Inputs/Text',
  component: InputText,
  parameters: {
    docs: {
      description: {
        component: 'Componente de input customizável do tipo texto, você pode utilizar todas as propriedades da tag input normalmente + as propriedades customizáveis.',
      },
    },
  },
  argTypes: {
    name: {
      control: false,
      description: 'Valor atribuido como nome do input.',
      type: {
        name: 'string',
        required: true,
      },
    },
    bg: {
      control: 'radio',
      description: 'Determina a cor de fundo do input. Por padrão o valor é "primary".',
      type: {
        name: 'string',
      },
      options: ['primary', 'secondary'],
      defaultValue: 'primary',
    },
    placeholder: {
      description: 'Valor interno que será exibido quando o input estiver vazio.',
    },
  },
  decorators: [
    (Component) => (
      <Form onSubmit={() => {}}>
        <Component />
      </Form>
    ),
  ],
} as Meta;
