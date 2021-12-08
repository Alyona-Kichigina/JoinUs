import styled from "styled-components"

export const Container = styled.div`
  width: 171px;
  height: 12px;
  background: #F4F6FA;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Oval = styled.div`
  width: 40px;
  height: 8px;
  background: ${props => props.active ? "var(--color-blue)" : "var(--color-white)"};
  border-radius: 100px;
  margin-right: 2px;
  &:last-child {
    margin-right: 0;
  }
`
