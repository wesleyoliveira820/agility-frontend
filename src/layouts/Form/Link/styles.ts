import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ILinkProps {
  [key:string]: any;
}

export const Container = styled(Link)<ILinkProps>`
  font-size: 14px;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif;
  text-decoration: none;
  color: ${(props) => props.theme.colors.brand.primary};

  &:hover {
    text-decoration: underline;
  }
`;
