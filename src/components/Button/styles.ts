import styled, { css, keyframes } from 'styled-components';
import { lighten, darken } from 'polished';

import { ButtonContainerStyleProps } from './button.types';

const circleLoader = keyframes`
  0% { transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
`;

export const Container = styled.button<ButtonContainerStyleProps>`
  font-family: 'Open Sans';
  font-weight: bold;

  border: 0;
  border-radius: 3px;

  background-color: ${(props) => props.theme.colors.brand.primary};
  color: ${(props) => props.theme.colors.text.banner};

  cursor: pointer;

  transition: background-color 0.2s;

  &:disabled {
    background-color: ${(props) => lighten(0.2, props.theme.colors.brand.primary)};
    cursor: default;
  }

  &:hover {
    ${(props) => !props.disabled && css`
      background-color: ${darken(0.1, props.theme.colors.brand.primary)};
    `}
  }

  ${(props) => props.medium && css`
    max-width: 360px;
    width: 100%;
    height: 44px;

    font-size: 16px;

    #button-loader {
      width: 22px;
      height: 22px;

      border: 4px solid ${lighten(0.13, props.theme.colors.brand.primary)};
      border-top: 4px solid ${lighten(0.35, props.theme.colors.brand.primary)};
    }
  `}

  ${(props) => props.small && css`
    max-width: 145px;
    width: 100%;
    height: 32px;

    font-size: 14px;
    line-height: 24px;

    #button-loader {
      width: 15px;
      height: 15px;

      border: 3px solid ${lighten(0.13, props.theme.colors.brand.primary)};
      border-top: 3px solid ${lighten(0.35, props.theme.colors.brand.primary)};
    }
  `}
`;

export const Loader = styled.div`
  border-radius: 50%;
  margin: auto;
  animation: ${circleLoader} 1s infinite linear;
`;
