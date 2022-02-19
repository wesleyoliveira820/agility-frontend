import { FormProps, FormHandles } from '@unform/core';
import { ReactNode, Ref } from 'react';

export interface ModalFormProps extends FormProps {
  isOpen?: boolean;
  formRef?: Ref<FormHandles> | undefined;
  modalTitle: string;
  modalDescription?: string;
  cancelButtonTitle?: string;
  children: ReactNode;
  onSubmit: (formData: any) => void;
  onClose?: () => void;
}
