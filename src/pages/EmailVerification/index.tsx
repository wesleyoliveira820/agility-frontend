import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';

import axios from '../../services/api';

interface IApiValidationProps {
  message: string;
}

function EmailVerification() {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  async function emailVerificationRequest() {
    const queryCode = new URLSearchParams(location.search).get('code');

    if (!queryCode) {
      setError('O código de verificação não existe.');
      return;
    }

    try {
      await axios.put('confirm-accounts', { code: queryCode });
      setSuccessMessage('Seu email foi verificado com sucesso! Você já pode fazer login!');
    } catch (_error) {
      const { response }: AxiosError<IApiValidationProps> = _error;

      if (response?.status === 404) {
        setError('Este código é inválido.');
        return;
      }

      if (response?.status === 500) {
        setError('Não foi possível fazer a verificação da sua conta. Tente novamente mais tarde ou entre em contato com suporte@agility.com');
      }
    }
  }

  useEffect(() => {
    emailVerificationRequest();
  }, []);

  return (
    <>
      {!error && !successMessage && <p>Seu email está sendo verificado...</p>}
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </>
  );
}

export default EmailVerification;
