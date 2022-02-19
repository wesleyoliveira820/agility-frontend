import { Story, Meta } from '@storybook/react';
import { useState } from '@storybook/addons';

import Button from '../Button';
import InputText from '../InputText';

import { ModalForm } from './index';
import { ModalFormProps } from './modal-form.types';

const Template: Story<ModalFormProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button title="Abrir modal" onClick={() => setShowModal(true)} />
      <ModalForm {...args} isOpen={showModal} onClose={() => setShowModal(false)}>
        <InputText name="field1" placeholder="Field1" />
        <Button title="Submit form" />
      </ModalForm>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  modalTitle: 'Default modal',
  modalDescription: 'Modal description',
  isOpen: true,
};

export default {
  title: 'Overlay/Modal form',
  component: ModalForm,
  parameters: {
    docs: {
      description: {
        component: 'Componente usado para a criação de formulários em formato de modal. Uso recomendado para formulários de cadastro de entidades. Além das propriedades customizadas você se basear nas propriedades da biblioteca unform.',
      },
    },
  },
  argTypes: {
    modalTitle: {
      description: 'Define o título exibido no formulário.',
      type: {
        name: 'string',
        required: true,
      },
    },
    modalDescription: {
      description: 'Define a descrição exibida no formulário.',
    },
    isOpen: {
      description: 'Define se o formulário está aberto ou fechado. Por padrão o valor é "true"',
    },
    cancelButtonTitle: {
      description: 'Define o texto do botão de cancelar ação do modal. Por padrão o título é "Cancelar".',
    },
  },
  decorators: [
    (Component) => (
      <Component />
    ),
  ],
} as Meta;
