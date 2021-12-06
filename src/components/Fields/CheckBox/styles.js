import styled from "styled-components"

export const CheckBoxContainer = styled.button`

`

export const BoxContainer = styled.div`
  width: var(--check-box-size);
  height: var(--check-box-size);
  border: 1px solid var(--border-color-input);
  border-radius: 6px;
  position: relative;
  ${CheckBoxContainer}:disabled {
    --border-color-input: var(--check-box-disabled-border);
    color: var(--input-disabled-color);
  }
`
// не знаю почему не видно картинки
export const CheckBox = styled.div`
  transition-property: background-color, border-color, transform;
  transition-timing-function: linear;
  transition-duration: 150ms;
  transform: ${props => props.checked ? "scale(1)" : "scale(0)"};
  position: absolute;
  background-image: url('./checkbox.jpg');
  background-color: var(--check-box-checked-bg);
  background-repeat: no-repeat;
  background-position: center;
  top: 2px;
  bottom: 2px;
  left: 2px;
  right: 2px;
  ${CheckBoxContainer}:disabled {
    background-color: var(--input-disabled-color)!important;
  }
`
