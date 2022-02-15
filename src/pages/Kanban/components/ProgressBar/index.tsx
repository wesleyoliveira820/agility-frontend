import { Container, Filler } from './styles';

interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <Container>
      <Filler progress={progress} />
    </Container>
  );
}

export { ProgressBar };
