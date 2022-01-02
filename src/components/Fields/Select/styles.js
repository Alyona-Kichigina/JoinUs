import styled from "styled-components"
import ScrollBar from "@Components/ScrollBar"
import IconToggleIndicator from "../../Icon/IconToggleIndicator";

export const MultipleOptionContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 5px 8px;
  min-width: 20px;
  margin-top: 4px;
  margin-right: 3px;
  background-color: var(--color-red);
  width: min-content;
  border-radius: 2px;
  white-space: nowrap;
  transition: border-color 250ms ease-in-out;
`

export const SelectInput = styled.input`
  padding: var(--padding-input);
  width: 100%;
  flex: 1 1 auto;
  //height: 100%;
  height: var(--height-input);
  padding-top: 0;
  padding-bottom: 0;
  /*border-bottom: var(--validation-error-border-b);*/
  &:disabled {
    color: var(--pink);
    &::placeholder {
      color: var(--color-red);
    }
  }
  &::placeholder  {
    color: var(--input-placeholder-color);
    opacity: 1;
    font-weight: 400;
  }
`

export const MultipleValuePrerenderContainer = styled.div`
  top: 0;
  bottom: 3px;
  right: 0;
  left: 2px;
  position: absolute;
  display: inline-flex;
  z-index: 200;
  pointer-events: none;
`

export const InputSelectContainer = styled.div`
  border: 1px solid var(--border-color-input);
  border-radius: var(--border-radius-input);
  min-height: var(--height-input);
  background: var(--background-input);
  height: var(--height-input);
  align-items: center;
  ${props => props.disabled && `background: var(--pink); ${MultipleOptionContainer} {
      background-color: var(--color-white);
    }`
}
  ${props => props.allWaysExpandedMultipleSelection && `
    ${SelectInput} {
      margin-top: 0;
      position: absolute;
      height: 100%;
    }
    ${MultipleValuePrerenderContainer} {
      position: static;
      margin-right: 20px;
      margin-left: 2px;
      padding-bottom: 3px;
      height: 100%;
    }
    ${MultipleOptionContainer} {
     height: auto;
    }
  `}
`

export const OverlayItemsContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
`

export const RemoveIconContainer = styled.button`
  padding: 0 8px;
  color: var(--pink);
`

export const SelectedOptionsScrollBar = styled(ScrollBar)`
  white-space: normal;
  max-height: 90px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  padding: 0 3px 3px;
  margin-top: 3px;
  border-top: 1px solid var(--pink);
`

export const SelectedOptions = styled.div`
  padding: 0;
  max-height: 150px;
`

export const NoOptionsLabel = styled.div`
  padding: var(--padding-input);
  width: 100%;
`

export const SelectContainer = styled.div`
  display: block;
  position: relative;
  flex: var(--flex-input);
  width: var(--width-input);
  background-color: var(--white);
`

export const ToggleIconContainer = styled.button`
  padding: var(--padding-toggle-icon-select);
  position: relative;
  color: var(--pink);
`

export const MultipleValueInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap
`
export const ToggleIndicator = styled(IconToggleIndicator)`
  transition: transform 500ms ease-in-out;
`
export const OptionContainer = styled.div`
  line-height: 1.42857143; /* Normalize line height */
  display: flex;
  padding: 8px 8px;
  clear: both;
  white-space: normal;
  cursor: pointer;
  transition: color, background-color ease-in-out 250ms;
  ${props => props.selected && "color: var(--color-light-blue);"}
  ${props => props.highlited && "background-color: var(--color-light-blue);"}
`
