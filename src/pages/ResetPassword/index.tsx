import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import type { AxiosError, AxiosResponse } from 'axios';
import type { SubmitHandler, FormHandles } from '@unform/core';

import { resetPasswordValidator } from '../../validators/reset-password';
import axios from '../../services/api';

import AuthLayout from '../../layouts/AuthPage';
import FormLayout from '../../layouts/Form';
import InputText from '../../components/InputText';
import Button from '../../components/Button';

interface IFormProps {
  password: string;
  password_confirmation: string;
}

type SuccessApi = AxiosResponse<{message: string}>

function ResetPassword() {
  const formRef = useRef<FormHandles>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function validateData(payload: IFormProps) {
    formRef.current?.setErrors({});

    const validation = await resetPasswordValidator(payload);

    if (validation) {
      formRef.current?.setErrors(validation);
      return false;
    }

    return true;
  }

  async function resetPasswordInApi(payload: IFormProps) {
    const queryCode = new URLSearchParams(location.search).get('code');

    if (!queryCode) {
      toast.error('Este link de verificação é inválido.');
      return false;
    }

    try {
      const response: SuccessApi = await axios.put('auth/reset-password', {
        verification_code: queryCode,
        ...payload,
      });

      toast.success(response.data.message);

      return true;
    } catch (error: any) {
      const { response }: AxiosError<{message: string}> = error;

      if (response?.status === 404) {
        toast.error('Este link de verificação é inválido.');
      }

      if (response?.data.message) {
        toast.error(response.data.message);
      }

      return false;
    }
  }

  const onSubmitForm: SubmitHandler<IFormProps> = async (payload) => {
    setIsLoading(true);

    const isValid = await validateData(payload);

    if (!isValid) {
      return setIsLoading(false);
    }

    const resetPassword = await resetPasswordInApi(payload);

    if (!resetPassword) {
      return setIsLoading(false);
    }

    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Redefinição de senha | Agility</title>
      </Helmet>
      <AuthLayout>
        <FormLayout>
          <header id="header-form">
            <h6>Nova senha</h6>
            <p>Defina uma nova senha</p>
          </header>

          <Form ref={formRef} onSubmit={onSubmitForm}>
            <InputText
              name="password"
              type="password"
              placeholder="Nova senha"
              autoFocus
            />
            <InputText
              name="password_confirmation"
              type="password"
              placeholder="Confirmar senha"
            />
            <Button
              type="submit"
              title="Redefinir senha"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </Form>
        </FormLayout>
      </AuthLayout>
    </>
  );
}

export default ResetPassword;
