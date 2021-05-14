import styled from 'styled-components';

export const Container = styled.ul`
  padding: 16px;
  padding-top: 56px;

  header {
    max-width: 933px;
    width: 100%;
    margin: 24px auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 24px;
  }
`;

export const Content = styled.ul`
  max-width: 933px;
  width: 100%;

  list-style: none;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;

  margin: auto;

  li {
    background-color: ${(props) => props.theme.colors.base.secondary};

    padding: 16px;
    height: 157px;

    border-radius: 5px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .loader-avatars {
      margin: 0 0 0 auto;
    }
  }
`;
