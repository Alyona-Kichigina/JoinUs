import React, { useCallback, useMemo } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const OptionContainer = styled.div`
  line-height: 1.42857143; /* Normalize line height */
  display: block;
  padding: 5px 15px;
  clear: both;
  white-space: normal;
  cursor: pointer;
  transition: color, background-color ease-in-out 250ms;
  ${props => props.selected && "color: var(--color-light-gold-1);"}
  ${props => props.highlited && "background-color: var(--color-grey-light-2);"}
`

const Option = ({
  labelKey, index, typeAheadPointer, selectedOptions, valueKey, option, option: { [labelKey]: label, [valueKey]: value },
  onSelect, onUpdateTypePointer
}) => {
  const compareSingleOptions = useCallback(
    (opt = "") => (typeof opt === "string" ? opt : opt[valueKey]) === value,
    [value, valueKey]
  )

  const isOptionSelected = useMemo(
    () => selectedOptions !== undefined && selectedOptions !== null
      ? Array.isArray(selectedOptions)
        ? selectedOptions.some(compareSingleOptions)
        : compareSingleOptions(selectedOptions)
      : false,
    [compareSingleOptions, selectedOptions]
  )

  const handleSelect = useCallback(() => {
    onSelect(option, isOptionSelected)
  }, [isOptionSelected, onSelect, option])

  const handleUpdateTypePointer = useCallback(() => {
    onUpdateTypePointer(index)
  }, [index, onUpdateTypePointer])

  return (
    <OptionContainer
      selected={isOptionSelected}
      highlited={index === typeAheadPointer}
      onMouseDown={handleSelect}
      onMouseOver={handleUpdateTypePointer}
    >
      { label }
    </OptionContainer>
  )
}

Option.propTypes = {
  labelKey: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  typeAheadPointer: PropTypes.number.isRequired,
  selectedOptions: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array,]),
  valueKey: PropTypes.string.isRequired,
  option: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onUpdateTypePointer: PropTypes.func.isRequired
}

export default Option
