import { IconType } from 'react-icons';

type ButtonSize = 'small' | 'medium';

interface IconButtonElementProps {
  title: string;
  Icon?: IconType;
  size?: ButtonSize;
}

export type IconButtonProps = JSX.IntrinsicElements['button'] & IconButtonElementProps;

export interface IconButtonContainerStyleProps {
  [key: string]: any;
}
