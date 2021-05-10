import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import { AxiosError } from 'axios';

import { resetPasswordValidator } from '../../validators/reset-password';
import axios from '../../services/api';

import AuthLayout from '../../layouts/AuthPage';
import FormLayout from '../../layouts/Form';
import InputText from '../../components/InputText';
import Button from '../../components/Button';
import MessageBox from '../../layouts/Form/MessageBox';

interface IFormProps {
  password: string;
  password_confirmation: string;
}

interface IErrorStatus {
  [key: number]: string;
}

function ResetPassword() {
  const formRef = useRef<FormHandles>(null);
  const location = useLocation();
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
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
      setFormError('Este link de recuperação é inválido.');
      return false;
    }

    try {
      await axios.put('auth/reset-password', {
        verification_code: queryCode,
        ...payload,
      });

      setFormSuccess('Senha alterada com sucesso! Faça login novamente.');
      return true;
    } catch (_error) {
      const { response }: AxiosError = _error;

      const errors: IErrorStatus = {
        401: 'O link de recuperação está expirado.',
        404: 'O link de recuperação é inválido',
        500: 'Desculpe, houve um erro interno no servidor.',
      };

      setFormError(errors[response?.status || 500]);
      return false;
    }
  }

  function clearFormErrors() {
    setFormError('');
    setFormSuccess('');
  }

  const onSubmitForm: SubmitHandler<IFormProps> = async (payload) => {
    clearFormErrors();

    setIsLoading(true);

    const isValid = await validateData(payload);

    if (!isValid) {
      return setIsLoading(false);
    }

    const resetPassword = await resetPasswordInApi(payload);

    if (!resetPassword) {
      return setIsLoading(false);
    }

    formRef.current?.reset();

    setIsLoading(false);
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

          {formError && (
            <MessageBox type="error" text={formError} />
          )}

          {formSuccess && (
            <MessageBox type="success" text={formSuccess} />
          )}

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
