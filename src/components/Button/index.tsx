import { ButtonProps } from './button.types';
import { Container, Loader } from './styles';

function Button({
  title,
  isLoading = false,
  disabled = false,
  medium = true,
  ...rest
}: ButtonProps) {
  return (
    <Container
      medium={medium}
      disabled={disabled}
      {...rest}
    >
      {isLoading && disabled ? <Loader id="button-loader" /> : title}
    </Container>
  );
}

export default Button;
