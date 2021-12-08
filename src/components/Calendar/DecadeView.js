import React, { useCallback, useMemo } from "react"
import PropTypes from "prop-types"
import { YearViewContainer, DecadeItem } from "./styles"

const DecadeView = ({ onSelect, currentYear }) => {
  const selectYear = useCallback((index) => () => { onSelect(index) }, [onSelect])
  const endOfDecade = useMemo(() => Math.ceil(currentYear / 10) * 10, [currentYear])

  const decadeItems = []
  for (let i = 1; i < 11; i++) {
    const year = endOfDecade - 10 + i
    decadeItems.push(
      <DecadeItem
        type="button"
        key={i}
        onClick={selectYear(year)}
      >
        { year }
      </DecadeItem>
    )
  }
  return (
    <YearViewContainer>
      {decadeItems}
    </YearViewContainer>
  )
}

DecadeView.propTypes = {
  onSelect: PropTypes.func.isRequired,
  currentYear: PropTypes.number.isRequired
}

export default DecadeView
