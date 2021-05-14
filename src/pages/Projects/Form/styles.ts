import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  height: calc(100vh - 56px);
  padding: 56px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 24px;

  img {
    margin-top: 56px;
  }

  h5 {
    font-size: 28px;
    font-weight: 500;
    line-height: 36px;

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
