import styled from "styled-components"

// разобраться с версткой
// при открытии и закрытии дергается список
// возможно из-за того что логотип пропадает

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
  &:hover {
    color: var(--color-white);
    background: var(--blue-gradient);
    --color-light-blue-2: var(--color-white);
  }
`

export const LeftMenuContainer = styled.div`
  position: relative;
  background: var(--color-white);
  height: 100%;
  flex: 0 0 auto;
  transition: .3s;
  color: var(--color-light-blue-2);
  font-weight: 700;
  border-right: 1px solid var(--color-light-grey-2);
  .active {
    ${LeftMenuItem} {
      background: var(--blue-gradient);
      color: var(--color-white);
      --color-light-blue-2: var(--color-white);
    }
  }
`
export const LeftMenuLogo = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 52px;
  padding-top: 34px;
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

export const ToggleToolbar = styled.div`
  position: fixed;
  bottom: 40px;
  cursor: pointer;
  z-index: 100;
  transition: all 1ms ease-in-out;
  will-change: transform;
  left: 32px;
  @media (max-width: 991px) {
    display: none;
  }
  &.default-open {
    //left: 32px;
  }
  &.default {
    transform: rotate(180deg);
  }
  &.close {
    .close {
      animation: closeImg .6s linear forwards;
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
