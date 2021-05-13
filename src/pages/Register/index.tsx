import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { AxiosError } from 'axios';

import InputText from '../../components/InputText';
import Button from '../../components/Button';
import Modal from './Modal';

import { useEmail } from '../../contexts/email-context';
import { userRegisterValidator } from '../../validators/user';
import axios from '../../services/api';

import AuthPageLayout from '../../layouts/AuthPage';
import FormLayout from '../../layouts/Form';
import Link from '../../layouts/Form/Link';

interface IFormProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface IApiValidationProps {
  message: string;
  field: string;
  validation: string;
}

type FormErrorsFormatted = {
  [x: string]: string
};

function Register() {
  const formRef = useRef<FormHandles>(null);
  const { clearEmail } = useEmail();
  const { email } = useEmail();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function validateFormData(userPayload: IFormProps) {
    formRef.current?.setErrors({});

    const validation = await userRegisterValidator(userPayload);

    if (validation) {
      formRef.current?.setErrors(validation);
      return false;
    }

    return true;
  }

  function formatApiErrors(formErrors: IApiValidationProps[]) {
    const errors: FormErrorsFormatted = {};

    formErrors.forEach(({ field, message }) => {
      errors[field] = message;
    });

    return errors;
  }

  async function registerUserInAPI(userPayload: IFormProps) {
    try {
      await axios.post('users', userPayload);

      return true;
    } catch (_error) {
      const { response }: AxiosError<IApiValidationProps[]> = _error;

      if (response?.data[0].message) {
        const errors = formatApiErrors(response.data);
        formRef.current?.setErrors(errors);
      }

      return false;
    }
  }

  const onSubmitForm: SubmitHandler<IFormProps> = async (userPayload) => {
    setIsLoading(true);

    const isValid = await validateFormData(userPayload);

    if (!isValid) {
      return setIsLoading(false);
    }

    const createdUser = await registerUserInAPI(userPayload);

    if (!createdUser) {
      return setIsLoading(false);
    }

    formRef.current?.reset();

    clearEmail();

    setIsLoading(false);

    setShowModal(true);
  };

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

          <Form ref={formRef} onSubmit={onSubmitForm}>
            <InputText name="name" placeholder="Nome" autoFocus />
            <InputText name="email" placeholder="Email" defaultValue={email} />
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
              isLoading={isLoading}
              disabled={isLoading}
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
      {showModal && <Modal />}
    </>
  );
}

export default Register;
