import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 24px;

  h5 {
    font-size: 28px;
    font-weight: 500;
    line-height: 36px;

    margin-top: 16px;

    max-width: 360px;
    width: 100%;

    text-align: left;
  }
`;

export const Form = styled(Unform)`
  max-width: 360px;
  width: 100%;

  padding-bottom: 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;
