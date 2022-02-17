import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    height: 250px;
    margin-bottom: 32px;
  }

  strong {
    font-size: 28px;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
  }

  button {
    margin-top: 32px;
    width: 300px;
  }
`;
