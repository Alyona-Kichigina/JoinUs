import styled from "styled-components"

export const LeftMenuContainer = styled.div`
  position: relative;
  background: var(--color-white);
  height: 100%;
  flex: 0 0 auto;
  transition: .3s;
  color: var(--color-light-blue-2);
  font-weight: 700;
  border-right: 1px solid var(--color-light-grey-2);
`
export const LeftMenuLogo = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 52px;
  padding-top: 34px;
`
export const LeftMenuItem = styled.div`
  transition: all 0.5s ease 0s;
  height: 48px;
  border-radius: 8px;
  margin: 0 16px 0 16px;
  display: flex;
  align-items: center;
  ${props => !props.hideToolbar} {
    justify-content: center;
  }
  ${props => !props.current} {
    background: var(--grey-gradient);
    color: var(--color-white);
  };
  &:hover {
    color: var(--color-white);
    background: var(--blue-gradient);
    --color-light-blue-2: var(--color-white);
  }
`

export const OpenMenuItem = styled.div`
   opacity: 0;
    transition: all .3s ease 0s;
    ${props => props.hideToolbar} {
      opacity: 1;
    }
`
export const ListTile = styled.div`
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.hideToolbar} {
    width: 100%;
    display: grid;
    grid-template-columns: 38px 1fr;
    grid-column-gap: 5px;
    padding: 0 15px 0 10px;
  }
`
// разобраться с версткой кнопки открытия и закрытия
export const ToggleToolbar = styled.div`
  position: fixed;
  bottom: 40px;
  cursor: pointer;
  z-index: 100;
  transition: all 1ms ease-in-out;
  will-change: transform;
  //left: 36px;
  @media (max-width: 991px) {
    display: none;
  }
  &.default-open {
    left: 36px;
    //transform: rotate(180deg);
  }
  &.default {
    left: 28px;
  }
  &.close {
    left: 28px;
    animation: closeToolbar .2s linear forwards;
    .close {
      animation: closeImg .6s linear forwards;
    }
  }
  &.open {
    left: 36px;
    animation: openToolbar .4s linear forwards;
    .open {
      animation: openImg .3s linear forwards;
      animation-delay: .5s;
    }
  }
  &.default-open, &.open {
    .icon-arrow {
      //margin-left:  -2px;
    }
  }
  &.default, &.close {
    .icon-arrow {
      //margin-right:  -2px;
    }
  }
`

export const ImgBanner = styled.img`
  width: 224px;
  position: fixed;
  bottom: 120px;
  left: 16px;
  opacity: 0;
  transition: all .3s ease 0s;
  ${props => props.hideToolbar} {
    opacity: 1;
  }
`
