import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form } from '@unform/web';
import { SubmitHandler } from '@unform/core';
import { AxiosError } from 'axios';

import axios from '../../services/api';

import InputText from '../../components/InputText';
import Button from '../../components/Button';

import AuthLayout from '../../layouts/AuthPage';
import FormLayout from '../../layouts/Form';
import Link from '../../layouts/Form/Link';

interface IErrorStatus {
  [key: number]: string;
}

function ForgotPassword() {
  const [errorForm, setErrorForm] = useState('');
  const [successForm, setSuccessForm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function sendEmailToApi(email: string) {
    try {
      await axios.post('auth/forgot-password', { email });

      setSuccessForm('Seu pedido foi enviado! Verifique seu email!');

      return;
    } catch (_error) {
      const { response }: AxiosError = _error;

      const errors: IErrorStatus = {
        401: 'A conta deste email não foi verificada.',
        404: 'Este email não existe.',
        500: 'Desculpe, houve um erro interno no servidor.',
      };

      return setErrorForm(errors[response?.status || 500]);
    }
  }

  const onSubmitForm: SubmitHandler<{ email: string }> = async ({ email }) => {
    if (!email) return;

    setErrorForm('');
    setSuccessForm('');

    setIsLoading(true);

    await sendEmailToApi(email);

    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Recuperação de senha | Agility</title>
      </Helmet>
      <AuthLayout>
        <FormLayout>
          <header id="header-form">
            <h6>Esqueceu a senha?</h6>
            <p>Sem problemas! Informe seu email e mandaremos um link de recuperação.</p>
          </header>

          {errorForm && (
            <div id="box-form-error">
              <p>{errorForm}</p>
            </div>
          )}

          {successForm && (
          <div id="box-form-success">
            <p>{successForm}</p>
          </div>
          )}

          <Form onSubmit={onSubmitForm}>
            <InputText type="email" name="email" placeholder="email" />
            <Button
              type="submit"
              title="Enviar link de recuperação"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </Form>

          <footer>
            <div id="link">
              <Link to="/login">Voltar</Link>
            </div>
          </footer>
        </FormLayout>
      </AuthLayout>
    </>
  );
}

export default ForgotPassword;
