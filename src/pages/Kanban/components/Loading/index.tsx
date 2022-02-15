import { ProgressBar } from '../ProgressBar';
import { Container, Content } from './styles';

import logoImg from '../../../../assets/global/logo-icon.svg';
import { useProject } from '../../../../contexts/project-context';

function Loading() {
  const { progress, isLoading } = useProject();

  if (isLoading) {
    return (
      <Container>
        <Content>
          <img src={logoImg} alt="Agility" />
          <ProgressBar progress={progress} />
        </Content>
      </Container>
    );
  }

  return null;
}

export { Loading };
