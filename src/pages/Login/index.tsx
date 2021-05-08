import { ChangeEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import InputText from '../../components/InputText';

import AuthPageLayout from '../../layouts/AuthPage';
import FormLayout from '../../layouts/Form';
import Link from '../../layouts/Form/Link';
import { loginValidator } from '../../validators/login';
import { useAuth } from '../../contexts/auth-context';

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
  const [formError, setFormError] = useState('');

  const onSubmitForm: SubmitHandler<IFormProps> = async (userPayload) => {
    setIsLoading(true);
    setFormError('');

    const login = await auth.login(userPayload);

    if (login?.error) {
      setIsLoading(false);
      setFormError(login.error);
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

          {formError && (
            <div id="box-form-error">
              <p>{formError}</p>
            </div>
          )}

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
