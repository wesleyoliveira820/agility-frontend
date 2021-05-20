import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkStyled = styled(Link)`
   text-decoration: none;
`;

export const Content = styled.li`
  background-color: ${(props) => props.theme.colors.base.secondary};
  height: 157px;

  border: 2px solid transparent;
  border-radius: 5px;

  padding: 16px;

  &:hover {
    border-color: ${(props) => props.theme.colors.brand.primary};
  }

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
