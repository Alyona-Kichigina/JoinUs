import styled from "styled-components"

export const DatePickerCalendarContainer = styled.div`
  position:  relative;
  top: 100%;
  width: 300px;
  z-index: 1000;
  background-color: var(--color-white);
  border-radius: 0px 0px 6px 6px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  ${props => props.allWaysOpen && `
    position: relative;
    width: auto;
    box-shadow: none;
    border-color: transparent;
    margin-top: 20px;
    padding: 0;
  `}
  .ant-picker-cell .ant-picker-cell-inner {
    border-radius: 8px;
  }
  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner, .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner, .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner {
    font-weight: 700;
  }
  .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner::before {
    border-radius: 8px;
  }
`

export const ToggleIcon = styled.button`
  transition: color 250ms ease-in-out;
  margin-right: 9px;
  path, rect {
    fill: ${props => props.open ? `var(--color-blue)` : `var(--color-light-blue-2)`};
  }
`

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  --background-input: var(--color-white);
  --border-radius-input: 0px;
  --border-with: 0px;
  --input-font-weight: 700;
  --padding-input: 16px 10px
`

export const BlockYear = styled.div`
  border-left: 1px solid var(--color-light-grey-2);
  `
