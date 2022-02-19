import { Form } from '@unform/web';

import { ModalFormProps } from './modal-form.types';
import LayoutForm from '../../layouts/Form';

import { Container } from './styles';

function ModalForm({
  isOpen = true,
  modalTitle,
  modalDescription,
  cancelButtonTitle = 'Cancelar',
  formRef,
  children,
  onSubmit,
  onClose,
  ...rest
}: ModalFormProps) {
  return isOpen ? (
    <Container>
      <LayoutForm>
        <header id="header-form">
          <h6>{modalTitle}</h6>
          <p>{modalDescription}</p>
        </header>

        <Form {...rest} ref={formRef} onSubmit={onSubmit}>
          {children}
        </Form>

        <footer>
          <button
            type="button"
            id="button-close"
            onClick={onClose}
          >
            {cancelButtonTitle}
          </button>
        </footer>
      </LayoutForm>
    </Container>
  ) : null;
}

export { ModalForm };
