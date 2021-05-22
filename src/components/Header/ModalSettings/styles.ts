import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: absolute;
  top: 56px;
  right: 0;
  left: 0;
  bottom: 0;

  z-index: 2;

  background-color: ${(props) => props.theme.colors.base.secondary};

  display: flex;
  justify-content: center;

  padding: 0 16px;
`;

export const Content = styled.div`
  max-width: 408px;
  width: 100%;
`;

export const OptionsList = styled.ul`
  list-style: none;
  margin-top: 24px;

  > h6 {
    font-size: 21px;
    font-weight: 500;
  }
`;

export const Option = styled.li`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.divider.primary};
  border-radius: 3px;
  margin-top: 16px;

  button {
    width: 100%;
    text-align: left;
    padding: 13px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => props.theme.colors.base.secondary};

    transition: background-color 0.2s;

    p {
      font-weight: 600;
    }
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.brand.primary};

    button {
      background-color: ${(props) => darken(0.02, props.theme.colors.base.secondary)};
    }
  }
`;
