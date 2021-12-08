import styled from "styled-components"

export const CheckBoxContainer = styled.button`

`

export const BoxContainer = styled.div`
  width: var(--check-box-size);
  height: var(--check-box-size);
  ${props => !props.checked &&
    `border: 2px solid var(--border-color-input);
     border-radius: 6px;`    
  }
  ${CheckBoxContainer}:disabled {
    --border-color-input: var(--check-box-disabled-border);
    color: var(--input-disabled-color);
  }
`
export const CheckBox = styled.div`
  transition-property: background-color, border-color, transform;
  transition-timing-function: linear;
  transition-duration: 150ms;
  transform: ${props => props.checked ? "scale(1)" : "scale(0)"};
  ${CheckBoxContainer}:disabled {
    background-color: var(--input-disabled-color)!important;
  }
`
