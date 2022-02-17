import { useTheme } from 'styled-components';
import { AvatarProps } from './avatar.types';
import { Container } from './styles';

function Avatar({
  initial_name = 'N',
  size = 'medium',
  withBorder = false,
  bg,
}: AvatarProps) {
  const { colors } = useTheme();

  return (
    <Container
      size={size}
      withBorder={withBorder}
      bg={bg || colors.brand.primary}
    >
      <h6>{initial_name}</h6>
    </Container>
  );
}

export default Avatar;
