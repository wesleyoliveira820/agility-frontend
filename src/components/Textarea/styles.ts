import styled, { css } from 'styled-components';
import { TextareaContainerStyleProps } from './textarea.types';

export const Container = styled.div<TextareaContainerStyleProps>`
  display: flex;
  flex-direction: column;

  max-width: 360px;
  width: 100%;

  textarea {
    width: 100%;
    height: 103px;
    padding: 13px 16px;
    font-size: 16px;
    color: ${(props) => props.theme.colors.text.primary};

    background-color: ${(props) => props.theme.colors.base[props.bg]};

    border: 1px solid ${(props) => props.theme.colors.divider.tertiary};

    ${(props) => props.error && css`
      border: 2px solid ${props.theme.colors.helpers.error};
      padding: 12px 15px;
    `}

    border-radius: 3px;

    &:focus {
      border: 2px solid ${(props) => props.theme.colors.brand.primary};
      padding: 12px 15px;
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
