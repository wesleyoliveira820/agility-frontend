import { darken } from 'polished';
import styled, { css } from 'styled-components';

import { IconButtonContainerStyleProps } from './icon-button.types';

export const Container = styled.button<IconButtonContainerStyleProps>`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.brand.primary};
  border-radius: 3px;

  ${(props) => props.size === 'medium' && css`
    height: 44px;

    .icon-button {
      padding: 6px 12px;
    }

    .text-button {
      padding: 0 16px;

      p {
        font-size: 16px;
        line-height: 24px;
      }
    }
  `};

  ${(props) => props.size === 'small' && css`
    height: 32px;

    .icon-button {
      padding: 6px 8px;
    }

    .text-button {
      padding: 0 12px;

      p {
        font-size: 14px;
        line-height: 24px;
      }
    }
  `};

  .icon-button {
    background-color: ${(props) => darken(0.07, props.theme.colors.brand.primary)};
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    height: 100%;
    display: flex;
    align-items: center;

    > svg {
      color: red;
    }
  }

  .text-button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  p {
    color: ${(props) => props.theme.colors.text.banner};
    font-weight: bold;
    font-size: 16px;
  }

  &:hover {
    background-color: ${(props) => darken(0.1, props.theme.colors.brand.primary)};

    .icon-button {
      background-color: ${(props) => darken(0.1, props.theme.colors.brand.primary)};
    }

    transition: background-color 0.2s;
  }
`;
