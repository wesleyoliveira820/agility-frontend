import styled from 'styled-components';

interface IAvatarProps {
  size: 'small' | 'medium' | 'large';
  withBorder?: boolean;
  bg: string;
}

export const Container = styled.div<IAvatarProps>`
  ${(props) => props.size === 'small' && `
    height: 32px;
    width: 32px;

    h6 {
      font-size: 14px;
    }
  `}

  ${(props) => props.size === 'medium' && `
    height: 40px;
    width: 40px;

    h6 {
      font-size: 18px;
    }
  `}

  ${(props) => props.size === 'large' && `
    height: 48px;
    width: 48px;

    h6 {
      font-size: 21px;
    }
  `}

  ${(props) => props.withBorder && `
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
