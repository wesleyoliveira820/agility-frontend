import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import type { AxiosError, AxiosResponse } from 'axios';

import axios from '../../services/api';

import { Container } from './styles';
import logo from '../../assets/projects/logo.svg';

interface IResponseApi {
  message: string;
}

type SuccessApi = AxiosResponse<IResponseApi>

type ErrorApi = AxiosError<IResponseApi>

function AcceptInvite() {
  const location = useLocation();
  const navigate = useNavigate();

  async function acceptInviteInApi() {
    const queryCode = new URLSearchParams(location.search).get('code');

    try {
      const response: SuccessApi = await axios.post('accept-invites', {
        invite_id: queryCode,
      });

      toast.success(response.data.message);

      navigate('/projects');
    } catch (error: any) {
      const { response }: ErrorApi = error;

      toast.error(response?.data.message);

      navigate('/projects');
    }
  }

  useEffect(() => {
    acceptInviteInApi();
  }, []);

  return (
    <Container>
      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 1.5, repeat: 99 }}
      >
        <img src={logo} alt="Agility" />
        <p>Processando convite...</p>
      </motion.div>
    </Container>
  );
}

export default AcceptInvite;
