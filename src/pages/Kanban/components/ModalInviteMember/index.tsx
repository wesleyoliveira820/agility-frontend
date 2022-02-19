import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { FormHandles } from '@unform/core';

import axios from '../../../../services/api';
import Button from '../../../../components/Button';
import InputText from '../../../../components/InputText';
import { ModalForm } from '../../../../components/ModalForm';
import { useAuth } from '../../../../hooks/use-auth';

import {
  FormProps,
  ModalInviteMemberProps,
  ParamsProps,
  PostInviteError,
  PostInviteResponse,
} from './modal-invite-member.types';

function ModalInviteMember({ toggleInviteModal }: ModalInviteMemberProps) {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const { projectId } = useParams<ParamsProps>();
  const [isLoading, setIsLoading] = useState(false);

  function formatEmailsInArray(emails: string) {
    const formattedEmails = emails.split(',');
    return formattedEmails.map((email) => email.trim());
  }

  function validateFormData(emails: string[]) {
    if (emails.length === 1 && emails[0] === '') {
      return {
        emails: 'Este campo é obrigatório.',
      };
    }

    if (emails.includes(user.email)) {
      return {
        emails: 'Você não pode convidar a si mesmo.',
      };
    }
  }

  async function sendInvites(emails: string[]) {
    const response = await axios.post<PostInviteResponse>('invites', {
      emails,
      project_id: projectId,
    });

    return response.data;
  }

  async function onSubmitForm({ emails }: FormProps) {
    try {
      const formattedEmails = formatEmailsInArray(emails);

      const validation = validateFormData(formattedEmails);

      if (validation) return formRef.current?.setErrors(validation);

      formRef.current?.setErrors({});
      setIsLoading(true);

      const invitationsSent = await sendInvites(formattedEmails);

      toast.success(invitationsSent.message);

      if (toggleInviteModal) toggleInviteModal();
    } catch (error: any) {
      const { response }: PostInviteError = error;

      setIsLoading(false);

      if (response && response.data[0].message) {
        formRef.current?.setErrors({
          emails: response?.data[0].message,
        });
      }
    }
  }

  return (
    <ModalForm
      modalTitle="Adicionar membro"
      modalDescription="Convide mais pessoas para participar do seu projeto. Separe múltiplos e-mails usando vírgula."
      formRef={formRef}
      onSubmit={onSubmitForm}
      onClose={toggleInviteModal}
    >
      <InputText name="emails" placeholder="Email(s)" autoFocus />
      <Button
        type="submit"
        title="Enviar convite(s)"
        isLoading={isLoading}
        disabled={isLoading}
      />
    </ModalForm>
  );
}

export default ModalInviteMember;
