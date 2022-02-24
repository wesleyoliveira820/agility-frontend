import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  width: 288px;
  background-color: ${(props) => props.theme.colors.base.secondary};
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 1px 4px 0 rgba(206, 218, 230, 0.8);

  margin-bottom: 16px;

  span {
    font-size: 14px;
    color: ${(props) => props.theme.colors.text.secondary};
  }
`;

export const Form = styled(Unform)`
  display: flex;
  align-items: center;

  margin-bottom: 8px;

  div .input-text {
    height: 40px;
  }

  button {
    width: 45px;
    line-height: 0;
    margin-left: 8px;
  }
`;
