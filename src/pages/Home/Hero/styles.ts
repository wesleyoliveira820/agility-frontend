import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: 634px;

  padding: 0 16px;

  background: linear-gradient(104deg, #178DE5, #279AF1, #43AEFF);

  #illustration {
    display: block;
    max-width: 1080px;
    width: 100%;
    height: auto;

    margin: -25px auto;
  }
`;

export const Content = styled.div`
  max-width: 1128px;
  width: 100%;

  margin: auto;
  padding: 48px 0;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 50px;
    font-weight: bold;
    line-height: 65px;

    color: #FFFFFF;

    max-width: 733px;
    width: 100%;

    margin-bottom: 16px;
  }

  .description {
    max-width: 552px;
    width: 100%;

    color: #FFFFFF;
    line-height: 24px;
  }
`;

export const Form = styled.form`
  display: flex;
  align-items: center;

  max-width: 552px;
  width: 100%;

  height: 44px;

  margin: 24px 0 16px;

  border-radius: 5px;

  input {
    max-width: 384px;
    width: 100%;
    height: 100%;

    padding: 0 16px;
    font-size: 16px;

    border: 0;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  button {
    width: 168px;
    height: 100%;

    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    font-size: 16px;
    color: #023822;

    background-color: #00DF60;

    transition: background-color 0.2s;

    &:hover {
      background-color: #02D35C;
    }
  }
`;
