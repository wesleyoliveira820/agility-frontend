export interface AvatarProps {
  size: 'small' | 'medium' | 'large'
  initial_name?: string;
  withBorder?: boolean;
  bg: string;
}

export interface AvatarContainerStyleProps extends Omit<AvatarProps, 'initial_name'> {}
