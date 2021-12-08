import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { MonthNames } from "./constants"
import { YearViewContainer, YearItem } from "./styles"

const YearView = ({ onSelect }) => {
  const selectMonth = useCallback((index) => () => { onSelect(index) }, [onSelect])
  return (
    <YearViewContainer>
      {MonthNames.map((month, index) => (
        <YearItem
          type="button"
          key={month}
          onClick={selectMonth(index)}
        >
          { month }
        </YearItem>
      ))}
    </YearViewContainer>
  )
}

YearView.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default YearView
