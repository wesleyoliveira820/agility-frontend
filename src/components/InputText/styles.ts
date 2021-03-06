import styled, { css } from 'styled-components';
import { InputContainerStyleProps } from './input-text.types';

export const Container = styled.div<InputContainerStyleProps>`
  display: flex;
  flex-direction: column;

  max-width: 360px;
  width: 100%;

  .input-text {
    width: 100%;
    height: 44px;
    padding: 0 16px;
    font-size: 16px;
    color: ${(props) => props.theme.colors.text.primary};

    background-color: ${(props) => props.theme.colors.base[props.bg]};

    border: 1px solid ${(props) => props.theme.colors.divider.tertiary};

    ${(props) => props.error && css`
      border: 2px solid ${props.theme.colors.helpers.error};
      padding: 0 15px;
    `}

    border-radius: 3px;

    &:focus {
      border: 2px solid ${(props) => props.theme.colors.brand.primary};
      padding: 0 15px;
    }
  }

  .error-text {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;

    color: ${(props) => props.theme.colors.helpers.error};

    margin-top: 4px;
  }
`;
