import styled from "styled-components";

export const Arrows = styled.div`
  position: absolute;
  right: ${props => props.right ? props.right : '11px;'};
  top: ${props => props.top ? props.top : '14px;'};
`
