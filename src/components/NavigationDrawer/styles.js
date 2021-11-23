import styled from "styled-components"

export const LeftMenuContainer = styled.div`
  position: relative;
  background: var(--color-white);
  height: 100%;
  flex: 0 0 auto;
  transition: .3s;
  color: var(--color-light-blue-2);
  font-weight: 700;
`
export const LeftMenuLogo = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  grid-column-gap: 18px;
  padding-bottom: 52px;
  padding-top: 34px;
`
export const LeftMenuItem = styled.div`
  transition: all 0.5s ease 0s;
  height: 48px;
  border-radius: 8px;
  margin: 0 16px 0 16px;
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
  padding: 0 15px 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.hideToolbar} {
    width: 100%;
    display: grid;
    grid-template-columns: 38px 1fr;
    grid-column-gap: 5px;
  }
`

export const ToggleToolbar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: fixed;
  bottom: 40px;
  cursor: pointer;
  z-index: 100;
  transition: all 1ms ease-in-out;
  will-change: transform;
  @media (max-width: 991px) {
    display: none;
  }
  &.default-open {
    left: 133px;
    transform: rotate(180deg);
  }
  &.default {
    left: 13px;
  }
  &.close {
    animation: closeToolbar .2s linear forwards;
    .close {
      animation: closeImg .6s linear;
    }
  }
  &.open {
    animation: openToolbar .4s linear forwards;
    .open {
      animation: openImg .3s linear forwards;
      animation-delay: .5s;
    }
  }
  &.default-open, &.open {
    .icon-arrow {
      margin-left:  -2px;
    }
  }
  &.default, &.close {
    .icon-arrow {
      margin-right:  -2px;
    }
  }
`

export const ImgBanner = styled.img`
  width: 224px;
`
