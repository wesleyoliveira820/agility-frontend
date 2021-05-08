import styled from 'styled-components';

export const Container = styled.div`
  > header {
    width: 100%;
    padding: 0 24px;
    background-color: ${(props) => props.theme.colors.brand.primary};

    #header-content-center {
      max-width: 1128px;
      width: 100%;
      margin: auto;
      padding: 32px 0 0;
    }
  }
`;

export const Content = styled.div`
  padding-bottom: 32px;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;

  :after {
    content: "";
    background-color: ${(props) => props.theme.colors.brand.primary};
    position: absolute;
    top: 0;
    bottom: 50%;
    left: 0;
    right: 0;
    z-index: -9999999;
  }
`;
