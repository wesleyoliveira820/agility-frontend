import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { AxiosError, AxiosResponse } from 'axios';

import axios from '../../services/api';

interface IResponseApiProps {
  message: string;
}

type SuccessApi = AxiosResponse<IResponseApiProps>

type ErrorApi = AxiosError<IResponseApiProps>

function EmailVerification() {
  const location = useLocation();
  const [message, setMessage] = useState('');

  async function emailVerificationRequest() {
    const queryCode = new URLSearchParams(location.search).get('code');

    if (!queryCode) {
      setMessage('Este link de verificação é inválido.');
      return;
    }

    try {
      const response: SuccessApi = await axios.put('confirm-accounts', {
        code: queryCode,
      });

      setMessage(response.data.message);
    } catch (_error) {
      const { response }: ErrorApi = _error;

      if (response?.status === 404) {
        return setMessage('Este link de verificação é inválido.');
      }

      setMessage('Erro de conexão.');
    }
  }

  useEffect(() => {
    emailVerificationRequest();
  }, []);

  return (
    <>
      {!message && <p>Seu email está sendo verificado...</p>}
      {message && <p>{message}</p>}
    </>
  );
}

export default EmailVerification;
