type BackgroundOptions = 'primary' | 'secondary'

interface TextareaElementProps {
  name: string;
  bg: BackgroundOptions;
}

export type TextareaProps = JSX.IntrinsicElements['textarea'] & TextareaElementProps;

export interface TextareaContainerStyleProps {
  error?: boolean;
  bg: BackgroundOptions;
}
