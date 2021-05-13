import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  position: fixed;

  background-color: rgba(0, 0, 0, .7);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 16px;

  z-index: 2;
`;
