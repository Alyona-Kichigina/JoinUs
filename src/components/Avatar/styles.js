import styled from 'styled-components'

export const AvatarContainer = styled.div`
  width: 140px;
  height: 140px;
  min-width: 140px;
  min-height: 140px;
`

export const EditButton = styled.button`
  position: absolute;
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  outline: 4px solid #ffffff;
  fill: white;
  background: var(--color-blue-hover-gradient);
  right: -4px;
  bottom: 9px;
  &:hover {
    fill: white!important;
  }
`

export const BaseAvatarContainer = styled.div`
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    outline: 1px solid #ebeff2;
    border-radius: 50%;
  }
`