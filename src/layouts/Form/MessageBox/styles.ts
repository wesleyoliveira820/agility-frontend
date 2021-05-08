import styled from 'styled-components';

interface IMessageProps {
  type: 'success' | 'error'
}

export const Container = styled.div<IMessageProps>`
  margin: -12px 0 16px;
  padding: 16px;

  ${(props) => props.type === 'success' && `
    background-color: #E3FDEC;
  `}

  ${(props) => props.type === 'error' && `
    background-color: #FDE3E5;
  `}

  border: 1px solid ${(props) => props.theme.colors.helpers[props.type]};

  > p {
    color: ${(props) => props.theme.colors.text.primary};
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
`;
