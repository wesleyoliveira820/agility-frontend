import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  align-items: flex-start;

  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;

  overflow-y: hidden;
  overflow-x: scroll;
`;

export const ButtonAddList = styled.button`
  min-width: 324px;
  width: 324px;

  background-color: #E5E8EB;
  height: 48px;

  transition: background-color 0.2s;

  span {
    font-weight: bold;
  }

  &:hover {
    background-color: ${darken(0.03, '#E5E8EB')};
  }
`;
