import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 72px;
  padding: 0 16px;

  background-color: ${(props) => props.theme.colors.base.secondary};
  border: 1px solid ${(props) => props.theme.colors.divider.tertiary};

  z-index: 9999999;

  #header-content {
    max-width: 1128px;
    width: 100%;
    height: 100%;

    margin: auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Button = styled.button`
  width: 96px;
  height: 44px;

  border: 3px solid ${(props) => props.theme.colors.brand.primary};
  border-radius: 5px;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.brand.primary};
    color: #FFFFFF;
  }
`;
