import styled from "styled-components"

export const SuggestDataInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  &:focus {
    background: var(--color-light-gold-3);
  }
`

export const DatePickerCalendarContainer = styled.div`
  position: ${props => props.containerStatic ? "static" : "relative"};
  top: 100%;
  width: 392px;
  z-index: 1000;
  background-color: var(--color-white);
  padding: 5% 10%;
  /*box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);*/
  border-radius: 2px;
  border: 1px solid var(--color-grey-Light-4);
  ${props => props.allWaysOpen && `
    position: relative;
    width: auto;
    box-shadow: none;
    border-color: transparent;
    margin-top: 20px;
    padding: 0;
  `}
`

// DatePickerInputContainer.withComponent("p")
