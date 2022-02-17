import { IoMdAdd } from 'react-icons/io';
import { useTheme } from 'styled-components';
import { IconButtonProps } from './icon-button.types';

import { Container } from './styles';

function IconButton({
  title = 'Icon button',
  Icon = IoMdAdd,
  size = 'medium',
  ...rest
}: IconButtonProps) {
  const { colors } = useTheme();

  return (
    <Container size={size} {...rest}>
      <div className="icon-button">
        <Icon
          size={
          size === 'medium' ? 24 : 20
        }
          color={colors.text.banner}
        />
      </div>
      <div className="text-button">
        <p>{title}</p>
      </div>
    </Container>
  );
}

export { IconButton };
