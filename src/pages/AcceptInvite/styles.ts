import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 75px;
      height: 75px;
      margin-bottom: 16px;
    }
  }
`;
