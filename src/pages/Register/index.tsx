import { Helmet } from 'react-helmet-async';
import { useEmail } from '../../contexts/email-context';

function Register() {
  const { email } = useEmail();

  return (
    <div>
      <Helmet>
        <title>Agility – Criar uma conta</title>
      </Helmet>
      <h2>{email}</h2>
    </div>
  );
}

export default Register;
