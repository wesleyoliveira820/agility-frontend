import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.li`
  min-width: 324px;
  width: 324px;
  height: 100%;

  list-style: none;

  border-right: 1px solid ${(props) => props.theme.colors.divider.tertiary};
  border-left: 1px solid ${(props) => props.theme.colors.divider.tertiary};

  margin-right: -1px;
`;

export const Header = styled.header`
  background-color: ${(props) => props.theme.colors.brand.primary};

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px 18px;

  #list-title, #list-actions {
    display: flex;
    align-items: center;

    h6 {
      font-size: 18px;
      color: ${(props) => props.theme.colors.base.secondary};
      font-weight: 500;
      margin-right: 8px;

      max-width: 160px;
      width: 100%;

      overflow: hidden;
      text-overflow: ellipsis;

      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    p {
      background-color: ${(props) => props.theme.colors.base.primary};
      padding: 2px 8px;
      border-radius: 8px;

      font-size: 14px;
    }

    #button-add-card {
      background-color: ${(props) => props.theme.colors.helpers.success};

      width: 32px;
      height: 32px;

      margin-right: 8px;

      border-radius: 8px;

      transition: background-color 0.2s;

      &:hover {
        background-color: ${(props) => darken(0.02, props.theme.colors.helpers.success)};
      }

      span {
        color: #FFFFFF;
        font-size: 21px;
        font-weight: bold;
      }
    }

    #button-more {
      height: 32px;

      img {
        transform: translateY(8%);
      }
    }
  }
`;

export const Content = styled.div`
  background-color: ${(props) => props.theme.colors.base.primary};

  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  padding: 16px 0 64px;

  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
