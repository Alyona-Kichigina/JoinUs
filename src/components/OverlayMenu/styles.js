import styled from "styled-components"

export const SlotContainer = styled.div`
  min-height: 27px;
  height: 100%;
  width: 100%;
  background: var(--color-white);
`

export const FixedContainer = styled.div`
  position: fixed;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  background: none;
  z-index: 2000;
  border-radius: 0 6px 0 6px;
  transition: none;
  text-align: left;
  ${props => props.positionStatic && `
    position: static;
    box-shadow: none;
    ${SlotContainer} {
      height: auto;
    }
  `}
`

export const Tip = styled.div`
  position: fixed;
  display: block;
  width: 10px;
  height: 10px;
  transform-origin: 50% 50%;
  background-color: var(--color-white);
  z-index: -1;
  box-shadow: -1px -1px 20px #aaa;
`
