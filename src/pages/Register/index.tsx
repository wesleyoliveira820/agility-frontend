import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form } from '@unform/web';
import type { FormHandles } from '@unform/core';
import type { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import InputText from '../../components/InputText';
import Button from '../../components/Button';

import Modal from './Modal';
import AuthPageLayout from '../../layouts/AuthPage';
import FormLayout from '../../layouts/Form';
import Link from '../../layouts/Form/Link';
import api from '../../services/api';
import formatApiValidations from '../../utils/format-api-validations';
import { validateCreateUser } from '../../validators/create-user.validator';

type FormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

type ApiValidationProps = {
  message: string;
  field: string;
  validation: string;
}

function Register() {
  const formRef = useRef<FormHandles>(null);

  const [mainRequestIsRunning, setMainRequestIsRunning] = useState(false);
  const [showConfirmRegisterModal, setShowConfirmRegisterModal] = useState(false);

  async function postUserRequest(formData: FormData) {
    await api.post('/users', formData);
  }

  async function handleSubmitForm(formData: FormData) {
    setMainRequestIsRunning(true);

    formRef.current?.setErrors({});

    const validation = await validateCreateUser(formData);

    if (validation) {
      setMainRequestIsRunning(false);
      return formRef.current?.setErrors(validation);
    }

    try {
      await postUserRequest(formData);

      formRef.current?.reset();

      setMainRequestIsRunning(false);
      setShowConfirmRegisterModal(true);
    } catch (error: any) {
      const { response }: AxiosError<ApiValidationProps[]> = error;

      setMainRequestIsRunning(false);

      if (response?.data[0]?.message) {
        const errors = formatApiValidations(response.data);
        return formRef.current?.setErrors(errors);
      }

      toast.error('Não foi possível criar uma nova conta. Tente novamente mais tarde.');
    }
  }

  return (
    <>
      <Helmet>
        <title>Agility – Cadastre-se</title>
      </Helmet>
      <AuthPageLayout>
        <FormLayout>
          <header id="header-form">
            <h6>Crie uma nova conta</h6>
            <p>Crie e gerencie projetos de forma ágil e escalável.</p>
          </header>

          <Form ref={formRef} onSubmit={handleSubmitForm}>
            <InputText name="name" placeholder="Nome" autoFocus />
            <InputText name="email" placeholder="Email" />
            <InputText type="password" name="password" placeholder="Senha" />
            <InputText
              type="password"
              name="password_confirmation"
              placeholder="Confirmar senha"
            />
            <p id="paragraph-content">
              Ao clicar em “Criar nova conta” você estará concordando
              com todos os nossos
              {' '}
              <Link to="#a">Termos</Link>
              {' '}
              e
              {' '}
              <Link to="#a">Política de privacidade</Link>
              .
            </p>
            <Button
              type="submit"
              title="Criar nova conta"
              isLoading={mainRequestIsRunning}
              disabled={mainRequestIsRunning}
            />
          </Form>

          <footer>
            <p id="link-with-text">
              Já possui uma conta?
              {' '}
              <Link to="/login">
                Conecte-se
              </Link>
            </p>
          </footer>
        </FormLayout>
      </AuthPageLayout>
      {showConfirmRegisterModal && <Modal />}
    </>
  );
}

export default Register;
