import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 2;

  background-color: ${(props) => props.theme.colors.base.secondary};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  img {
    height: 73px;
    margin-bottom: 40px;
  }
`;
