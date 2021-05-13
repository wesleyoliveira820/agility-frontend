import { Container } from './styles';

export interface IAvatarProps {
  size: 'small' | 'medium' | 'large'
  initial_name?: string;
  withBorder?: boolean;
  bg: string;
}

function Avatar({
  initial_name = 'N',
  size = 'medium',
  withBorder = false,
  bg = '#7159c1',
}: IAvatarProps) {
  return (
    <Container
      size={size}
      withBorder={withBorder}
      bg={bg}
    >
      <h6>{initial_name}</h6>
    </Container>
  );
}

export default Avatar;
