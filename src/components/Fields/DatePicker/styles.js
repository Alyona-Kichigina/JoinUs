import styled from "styled-components"

export const DatePickerCalendarContainer = styled.div`
  position:  relative;
  top: 100%;
  width: 392px;
  z-index: 1000;
  background-color: var(--color-white);
  padding: 13px 16px;
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

export const ToggleIcon = styled.button`
  transition: color 250ms ease-in-out;
  margin-right: 9px;
  path, rect {
    fill: ${props => props.open ? `var(--color-blue)` : `var(--color-light-blue-2)`};
  }
`
