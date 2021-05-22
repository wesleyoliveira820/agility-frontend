import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../../../contexts/auth-context';

import arrowRight from '../../../assets/global/arrow-right.svg';

import {
  Container,
  Content,
  OptionsList,
  Option,
} from './styles';

function ModalSettings() {
  const auth = useAuth();
  const history = useHistory();

  async function onLogout() {
    const logout = await auth.logout();

    if (logout) {
      toast.success('Você foi deslogado com sucesso, até a próxima!');
      history.push('/login');
    } else {
      toast.error('Houve um erro ao fazer logout, tente novamente mais tarde.');
    }
  }

  return (
    <Container>
      <Content>
        <OptionsList>
          <h6>Geral</h6>
          <Option>
            <button type="button" onClick={onLogout}>
              <p>Sair desta conta</p>
              <img src={arrowRight} alt="Clicar" />
            </button>
          </Option>
        </OptionsList>
      </Content>
    </Container>
  );
}

export default ModalSettings;
