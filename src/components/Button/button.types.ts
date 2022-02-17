interface ButtonElementProps {
  title: string;
  medium?: boolean;
  small?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

export type ButtonProps = JSX.IntrinsicElements['button'] & ButtonElementProps;

export interface ButtonContainerStyleProps {
  [key: string]: any;
}
