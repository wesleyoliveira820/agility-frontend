import { ChangeEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { SubmitHandler } from '@unform/core';

import Button from '../../components/Button';
import InputText from '../../components/InputText';

import { loginValidator } from '../../validators/login';

import AuthPageLayout from '../../layouts/AuthPage';
import FormLayout from '../../layouts/Form';
import Link from '../../layouts/Form/Link';
import { useAuth } from '../../hooks/use-auth';

interface IFormProps {
  email: string;
  password: string;
}

function Login() {
  const auth = useAuth();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({} as IFormProps);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onSubmitForm: SubmitHandler<IFormProps> = async (userPayload) => {
    setIsLoading(true);

    const login = await auth.login(userPayload);

    if (login?.message) {
      setIsLoading(false);
      toast.error(login?.message);
      return;
    }

    history.push('/projects');
  };

  function onChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  async function validateFomAndDisableButton() {
    const isValid = loginValidator(userInfo);
    setDisabled(isValid);
  }

  useEffect(() => {
    validateFomAndDisableButton();
  }, [userInfo]);

  return (
    <>
      <Helmet>
        <title>Agility – Conecte-se</title>
      </Helmet>

      <AuthPageLayout>
        <FormLayout>
          <header id="header-form">
            <h6>Bem-vindo(a) de volta!</h6>
            <p>Conecte-se para continuar.</p>
          </header>

          <Form onSubmit={onSubmitForm}>
            <InputText
              type="email"
              name="email"
              placeholder="Email"
              autoFocus
              onChange={onChangeInput}
            />
            <InputText
              type="password"
              name="password"
              placeholder="Senha"
              onChange={onChangeInput}
            />
            <Link to="/forgot-password">Esqueci minha senha</Link>
            <Button
              type="submit"
              title="Entrar"
              disabled={disabled || isLoading}
              isLoading={isLoading}
            />
          </Form>

          <footer>
            <p id="link-with-text">
              Ainda não possui uma conta?
              {' '}
              <Link to="/register">Crie uma conta</Link>
            </p>
          </footer>
        </FormLayout>
      </AuthPageLayout>
    </>
  );
}

export default Login;
