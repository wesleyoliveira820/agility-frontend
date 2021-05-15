import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkStyled = styled(Link)`
   text-decoration: none;
`;

export const Content = styled.li`
  background-color: ${(props) => props.theme.colors.base.secondary};
  box-shadow: 0 1px 4px 0 rgba(206, 218, 230, 0.80);
  height: 157px;

  border-radius: 5px;

  padding: 16px;

  p {
    width: 100%;
    height: 22px;
    font-weight: bold;

    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  span {
    height: 43px;
    font-size: 14px;
    line-height: 22px;

    color: ${(props) => props.theme.colors.text.secondary};

    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
