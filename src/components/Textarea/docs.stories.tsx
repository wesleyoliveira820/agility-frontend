import { Story, Meta } from '@storybook/react';
import { Form } from '@unform/web';
import Textarea, { TextareaProps } from './index';

const Template: Story<TextareaProps> = (args) => <Textarea {...args} />;

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
  title: 'Components/Textarea',
  component: Textarea,
  decorators: [
    (Component) => (
      <Form onSubmit={() => {}}>
        <Component />
      </Form>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Este é um componente customizado do textarea. Você pode fornercer todas as propriedades nativas + customizadas.',
      },
    },
  },
  argTypes: {
    name: {
      description: 'Define o nome do input.',
    },
    placeholder: {
      description: 'Texto mostrado no input quando o mesmo estiver vazio.',
    },
    bg: {
      description: 'Define a cor de fundo do input. Por padrão o valor é "primary".',
    },
  },
} as Meta;
