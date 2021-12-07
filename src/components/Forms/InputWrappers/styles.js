import styled from "styled-components"

export const InputWrapperContainer = styled.div`
 :not(:last-child) {
  margin-bottom: var(--indent-bottom-for-form);
 }
`

export const InputLabel = styled.label`
 display: flex;
 align-items: start;
 margin: 0;
 padding-bottom: 6px;
  color: var(--color-light-blue-2);
  font-size: 12px;
`

export const InputContainer = styled.div`
 position: relative;
 display: flex;
 flex-direction: column;
 width: 100%;
 align-items: stretch;
 ::before {
   content: "";
   display: ${props => props.hasError ? "block" : "none"};
   width: 100%;
   height: 2px;
   background: var(--validation-color);
   position: absolute;
   border-radius: 4px;
   bottom: 0;
 }
`

export const InputErrorContainer = styled.div`
 color: var(--validation-color);
 position: absolute;
 left: 0;
 top: calc(100% + 4px);
 margin-bottom: 2px;
 font-size: 12px;
`
