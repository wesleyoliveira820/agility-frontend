import styled from 'styled-components';

export const Container = styled.div`
  max-width: 408px;
  width: 100%;

  padding: 24px;
  background-color: ${(props) => props.theme.colors.base.secondary};

  border-radius: 3px;

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);

  #header-form {
    margin-bottom: 24px;

    h6 {
      font-size: 21px;
      line-height: 31.5px;
      font-weight: 500;
    }

    p {
      font-size: 14px;
      line-height: 22px;
      margin-top: 2px;
      color: ${(props) => props.theme.colors.text.secondary};
    }
  }

  > form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    #paragraph-content {
      width: 100%;
      text-align: center;
      font-size: 14px;
      line-height: 22px;
    }
  }

  footer {
    margin-top: 24px;
    display: flex;
    justify-content: center;

    #link {
    }

    #link-with-text {
      font-size: 14px;
    }

    #button-close {
      color: ${(props) => props.theme.colors.helpers.error};
      font-size: 14px;
    }
  }
`;
