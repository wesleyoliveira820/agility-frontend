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

  #body-content-bg {
    width: 100%;
    height: 245px;
    background-color: ${(props) => props.theme.colors.brand.primary};
  }

  #body-padding-content {
    width: 100%;
    padding: 0 16px;
    background: 0;

    > div {
      margin: -245px auto 0;
    }
  }
`;
