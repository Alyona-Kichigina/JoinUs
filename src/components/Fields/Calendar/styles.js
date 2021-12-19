import styled from "styled-components"

export const SuggestDataInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  &:focus {
    background: var(--pink);
  }
`

export const DatePickerCalendarContainer = styled.div`
  position:  relative;
  top: 100%;
  width: 392px;
  z-index: 1000;
  background-color: var(--color-white);
  padding: 5% 10%;
  border-radius: 0px 0px 6px 6px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15)
  ${props => props.allWaysOpen && `
    position: relative;
    width: auto;
    box-shadow: none;
    border-color: transparent;
    margin-top: 20px;
    padding: 0;
  `}
`
