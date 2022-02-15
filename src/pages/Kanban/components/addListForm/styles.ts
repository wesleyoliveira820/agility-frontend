import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.form`
  min-width: 324px;
  width: 324px;
  margin-left: 1px;

  background-color: ${(props) => props.theme.colors.base.secondary};

  padding: 16px;

  box-shadow: 0 1px 4px 0 rgba(206, 218, 230, 0.8);

  input {
    width: 100%;
    padding: 8px 16px;
    font-size: 16px;

    border: 1px solid ${(props) => props.theme.colors.divider.secondary};
    border-radius: 3px;

    &:focus {
      border: 2px solid ${(props) => props.theme.colors.brand.primary};
      padding: 7px 15px;
    }
  }

  > div {
    display: flex;
    align-items: center;
    margin-top: 12px;

    button[type="submit"] {
      background-color: ${(props) => props.theme.colors.brand.primary};
      padding: 8px 16px;
      border-radius: 3px;

      font-size: 14px;
      color: #FFFF;
      margin-right: 8px;

      transition: background-color 0.2s;

      &:hover {
        background-color: ${(props) => darken(0.1, props.theme.colors.brand.primary)};
      }
    }

    button[type="button"] {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
