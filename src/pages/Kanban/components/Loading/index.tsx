import { useContextSelector } from 'use-context-selector';

import { ProgressBar } from '../ProgressBar';
import { Container, Content } from './styles';

import logoImg from '../../../../assets/global/logo-icon.svg';
import { ProjectContext } from '../../../../contexts/project/context';

function Loading() {
  const isLoading = useContextSelector(ProjectContext, (state) => state.isLoading);
  const progress = useContextSelector(ProjectContext, (state) => state.progress);

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
