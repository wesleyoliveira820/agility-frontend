import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import type { SubmitHandler, FormHandles } from '@unform/core';
import type { AxiosResponse } from 'axios';

import axios from '../../../services/api';
import FormLayout from '../../../layouts/Form';
import InputText from '../../../components/InputText';
import Button from '../../../components/Button';
import { useAuth } from '../../../contexts/auth-context';

import { Container } from './styles';

interface IModalProps {
  toggleInviteModal?: () => void;
}

interface IFormProps {
  emails: string
}

interface IParamsProps {
  projectId: string;
}

interface IResponseApi {
  message: string;
}

type SuccessApi = AxiosResponse<IResponseApi>;

function ModalInviteMember({ toggleInviteModal }: IModalProps) {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const { projectId } = useParams<IParamsProps>();
  const [isLoading, setIsLoading] = useState(false);

  function formatEmailsInArray(emails: string) {
    const formattedEmails = emails.split(',');

    return formattedEmails.map((email) => email.trim());
  }

  function validateFormData(emails: string[]): true | void {
    if (emails.length === 0) {
      formRef.current?.setErrors({
        emails: 'Este campo é obrigatório.',
      });
    }

    if (emails.includes(user.email)) {
      return formRef.current?.setErrors({
        emails: 'Você não pode convidar a si mesmo.',
      });
    }

    return true;
  }

  async function sendInvites(emails: string[]) {
    const response: SuccessApi = await axios.post('invites', {
      emails,
      project_id: projectId,
    });

    if (response.data.message) {
      toast.success(response.data.message);
    }
  }

  const onSubmitForm: SubmitHandler<IFormProps> = async ({ emails }) => {
    formRef.current?.setErrors({});

    setIsLoading(true);

    const formattedEmails = formatEmailsInArray(emails);

    const validation = validateFormData(formattedEmails);

    if (!validation) {
      return setIsLoading(false);
    }

    await sendInvites(formattedEmails);

    if (toggleInviteModal) toggleInviteModal();
  };

  return (
    <Container>
      <FormLayout>
        <header id="header-form">
          <h6>Adicionar Membro</h6>
          <p>
            Convide 1 ou mais pessoas para participar do seu projeto.
            Separe os email por vírgula caso seja mais de 1.
          </p>
        </header>

        <Form onSubmit={onSubmitForm} ref={formRef}>
          <InputText name="emails" placeholder="Email(s)" autoFocus />
          <Button
            type="submit"
            title="Enviar convite(s)"
            isLoading={isLoading}
            disabled={isLoading}
          />
        </Form>

        <footer>
          <button
            type="button"
            id="button-close"
            onClick={toggleInviteModal}
          >
            Cancelar
          </button>
        </footer>
      </FormLayout>
    </Container>
  );
}

export default ModalInviteMember;
