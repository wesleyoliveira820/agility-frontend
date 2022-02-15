import styled from 'styled-components';

interface FillerProps {
  progress: number;
}

export const Container = styled.div`
  height: 10px;
  max-width: 300px;
  width: 100%;

  background-color: ${(props) => props.theme.colors.base.primary};

  border-radius: 10px;
`;

export const Filler = styled.div<FillerProps>`
  height: 100%;
  width: ${(props) => props.progress}%;

  background-color: ${(props) => props.theme.colors.brand.primary};
  border-radius: inherit;

  text-align: right;

  transition: width 0.8s ease-in-out;
`;
