import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import type { AxiosError, AxiosResponse } from 'axios';
import type { FormHandles, SubmitHandler } from '@unform/core';

import axios from '../../services/api';
import InputText from '../../components/InputText';
import Button from '../../components/Button';

import AuthLayout from '../../layouts/AuthPage';
import FormLayout from '../../layouts/Form';
import Link from '../../layouts/Form/Link';
import formatApiValidations from '../../utils/format-api-validations';

interface IErrorResponseApi {
  field: string;
  message: string;
}

type SuccessApi = AxiosResponse<{ message: string }>

function ForgotPassword() {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function sendEmailToApi(email: string) {
    try {
      const response: SuccessApi = await axios.post('auth/forgot-password', {
        email,
      });

      toast.success(response.data.message);

      return true;
    } catch (error: any) {
      const { response }: AxiosError<IErrorResponseApi[]> = error;

      if (response?.data[0]?.message) {
        const errors = formatApiValidations(response?.data);

        formRef.current?.setErrors(errors);
      }

      return false;
    }
  }

  const onSubmitForm: SubmitHandler<{ email: string }> = async ({ email }) => {
    if (!email) return;

    formRef.current?.setErrors({});

    setIsLoading(true);

    const sendEmail = await sendEmailToApi(email);

    if (!sendEmail) return setIsLoading(false);

    navigate('/login');
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
            <p>
              Sem problemas! Informe seu email e
              mandaremos um link de recuperação.
            </p>
          </header>

          <Form ref={formRef} onSubmit={onSubmitForm}>
            <InputText
              type="email"
              name="email"
              placeholder="email"
            />
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
