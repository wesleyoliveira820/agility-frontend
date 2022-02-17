type BackgroundOptions = 'primary' | 'secondary'

interface InputElementProps {
  name: string;
  bg?: BackgroundOptions;
}

export type InputProps = JSX.IntrinsicElements['input'] & InputElementProps;

export interface InputContainerStyleProps {
  error?: boolean;
  bg: BackgroundOptions;
}
