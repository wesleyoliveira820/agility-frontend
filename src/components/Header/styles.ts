import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

interface IButtonSettingsProps {
  showModal: boolean;
}

export const Container = styled.header`
  width: 100%;
  height: 56px;
  padding: 0 24px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  background-color: ${(props) => props.theme.colors.base.secondary};
  border-bottom: 1px solid ${(props) => props.theme.colors.divider.tertiary};

  display: flex;
  align-items: center;
  justify-content: space-between;

  #logo-title-project {
    display: flex;
    align-items: center;
    gap: 8px;

    #title-project {
      font-size: 21px;
    }
  }

  #tools {
    display: flex;
    align-items: center;
    justify-content: space-between;

    #project-info-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-right: 16px;

      #divider {
        height: 32px;
        border-left: 2px solid ${(props) => props.theme.colors.divider.tertiary};
      }
    }
  }
`;

export const ButtonSetting = styled.button<IButtonSettingsProps>`
  width: 40px;
  height: 40px;


  ${(props) => (props.showModal ? `
    background-color: ${props.theme.colors.brand.primary};

    &:hover {
      background-color: ${darken(0.04, props.theme.colors.brand.primary)};
    }

    > img {
      filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(346deg) brightness(104%) contrast(100%);
    }
  ` : `
    background-color: ${props.theme.colors.base.primary};

    &:hover {
      background-color: ${darken(0.04, props.theme.colors.base.primary)};
    }
  `)}

  border-radius: 50%;
  margin-right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s;
`;

export const Avatar = styled.div`
  height: 40px;
  width: 40px;
  background-color: #7159c1;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  h6 {
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
    color: #FFFFFF;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export const LinkStyled = styled(Link)`
  transform: translateY(12%);
`;
