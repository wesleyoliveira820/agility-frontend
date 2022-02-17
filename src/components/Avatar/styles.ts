import styled, { css } from 'styled-components';
import { AvatarContainerStyleProps } from './avatar.types';

export const Container = styled.div<AvatarContainerStyleProps>`
  ${(props) => props.size === 'small' && css`
    height: 32px;
    width: 32px;

    h6 {
      font-size: 14px;
    }
  `}

  ${(props) => props.size === 'medium' && css`
    height: 40px;
    width: 40px;

    h6 {
      font-size: 18px;
    }
  `}

  ${(props) => props.size === 'large' && css`
    height: 48px;
    width: 48px;

    h6 {
      font-size: 21px;
    }
  `}

  ${(props) => props.withBorder && css`
    border: 1px solid #FFFFFF;
  `}

  background-color: ${(props) => props.bg};

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  h6 {
    font-weight: 500;
    line-height: 40px;
    color: #FFFFFF;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;
