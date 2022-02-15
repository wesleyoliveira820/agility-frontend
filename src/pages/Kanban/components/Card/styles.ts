import styled from 'styled-components';

export const Container = styled.div`
  min-width: 288px;
  width: 288px;

  border-radius: 5px;

  background-color: ${(props) => props.theme.colors.base.secondary};
  box-shadow: 0 1px 3px 0 rgba(206, 218, 230, 0.8);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: #DFE2E4;
    padding: 0 8px;

    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    button {
      height: 21px;
    }
  }

  #card-content {
    width: 100%;
    padding: 8px 16px;

    span {
      font-size: 14px;
      font-weight: 600;
    }
  }

  footer {
    #card-footer-calendar {
      display: flex;
      align-items: center;
      gap: 4px;

      padding: 8px 16px 16px;

      span {
        font-size: 12px;
        color: ${(props) => props.theme.colors.text.secondary};
      }
    }
  }
`;
