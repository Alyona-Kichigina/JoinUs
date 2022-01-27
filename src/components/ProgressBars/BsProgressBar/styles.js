import styled from "styled-components"

export const LineContainer = styled.div`
  --rail-height: 4px;
  --active-color: var(--color-blue-hover);
  height: 4px;
  width: 173px;
`
export const ProgressLine = styled.div`
  transition: width 250ms ease-in-out;
  height: 4px;
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--color-light-blue-2);
`
