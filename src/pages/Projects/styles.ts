import styled from 'styled-components';

export const ProjectContainer = styled.div`
  height: 100vh;
  padding: 0 16px;
  padding-top: 56px;
`;

export const ProjectContent = styled.div`
  max-width: 933px;
  width: 100%;

  margin: 24px auto;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h6 {
      font-size: 21px;
      font-weight: 500;
    }
  }

  ul {
    margin-top: 24px;
    list-style: none;
    padding-bottom: 24px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;
  }
`;
