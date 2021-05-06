import styled from 'styled-components';

export const Container = styled.div`
  max-width: 408px;
  width: 100%;

  padding: 24px;
  background-color: ${(props) => props.theme.colors.base.secondary};

  border-radius: 5px;

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);

  #header-form {
    margin-bottom: 24px;

    h6 {
      font-size: 21px;
      font-weight: 500;
    }

    p {
      font-size: 14px;
      color: ${(props) => props.theme.colors.text.secondary};
    }
  }

  #box-form-error {
    margin: -12px 0 16px;
    padding: 16px;

    background-color: #FDE3E5;
    border: 1px solid ${(props) => props.theme.colors.helpers.error};

    p {
      color: ${(props) => props.theme.colors.text.primary};
      font-size: 14px;
      font-weight: 5  00;
      text-align: center;
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
    #link-with-text {
      font-size: 14px;
      text-align: center;
      margin-top: 24px;
    }
  }
`;
