import arrowRight from '../../../assets/global/arrow-right.svg';
import { useAuth } from '../../../hooks/use-auth';
import api from '../../../services/api';

import {
  Container,
  Content,
  OptionsList,
  Option,
} from './styles';

function ModalSettings() {
  const auth = useAuth();

  async function handleLogout() {
    await api.delete('logout');
    auth.logout();
  }

  return (
    <Container>
      <Content>
        <OptionsList>
          <h6>Geral</h6>
          <Option>
            <button type="button" onClick={handleLogout}>
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
