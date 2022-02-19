import styled, { keyframes } from 'styled-components';

const fadeAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${fadeAnimation} 0.2s;

  padding: 0 16px;

  z-index: 2;
`;
