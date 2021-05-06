import { Container, Loader } from './styles';

export interface IButtonProps {
  title: string;
  medium?: boolean;
  small?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

export type ButtonProps = JSX.IntrinsicElements['button'] & IButtonProps;

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
