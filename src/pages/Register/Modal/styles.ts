import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, .7);
`;

export const ModalContainer = styled.div`
  max-width: 388px;
  width: 100%;
  padding: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.theme.colors.base.secondary};
  border-radius: 3px;

  h6 {
    font-size: 21px;
    font-weight: 500;
    line-height: 30px;
    margin-top: 16px;
  }

  p {
    font-size: 16px;
    line-height: 24px;
    color: ${(props) => props.theme.colors.text.secondary};
    text-align: center;
    margin: 16px 0 24px;
  }

  button {
    color: ${(props) => props.theme.colors.brand.primary};
  }

`;
