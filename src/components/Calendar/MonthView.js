import React, { useCallback, useMemo, useState } from "react"
import PropTypes from "prop-types"
import DayView from "./DayView"
import { WeekHeaders } from "./constants"
import { MonthViewContainer, MonthViewHeader } from "./styles"

const MonthView = ({ currentYear, currentMonth, normalizedVal, range, containerWidth, onInput, ...props }) => {
  const [isMouseDown, setMouseDownFlag] = useState(false)
  const [originSelectedDay, setOriginSelectedDay] = useState()
  const [selectedRange, setSelectedRange] = useState()
  const currentSelectedRange = selectedRange || normalizedVal
  const { daysCount, dayOfTheWeek } = useMemo(() => {
    const Calendar = []
    for (let i = 1; i < 13; i++) {
      const lastDay = new Date(currentYear, i, 0, 0)
      const firstWeekDayInMonth = new Date(currentYear, i - 1, 1, 0).getDay() - 1
      Calendar.push({
        prevLastDay: i > 1 ? Calendar[i - 2].daysCount : new Date(currentYear, i - 1, 0, 0).getDate(),
        dayOfTheWeek: firstWeekDayInMonth >= 0 ? firstWeekDayInMonth : 6,
        daysCount: lastDay.getDate(),
        dayAppendix: 7 - lastDay.getDay()
      })
    }
    return Calendar
  }, [currentYear])[currentMonth]

  const normalizeSelection = useCallback((day) => originSelectedDay > day
    ? [day, originSelectedDay] : [originSelectedDay, day], [originSelectedDay])

  const mouseDown = useCallback((day) => {
    if (isMouseDown) {
      onInput(normalizeSelection(day))
      setMouseDownFlag(false)
      setOriginSelectedDay(undefined)
      setSelectedRange(undefined)
    } else {
      setMouseDownFlag(true)
      setOriginSelectedDay(day)
      setSelectedRange([day, day])
    }
  }, [isMouseDown, normalizeSelection, onInput])
  const mouseOver = useCallback((day) => { setSelectedRange(normalizeSelection(day)) }, [normalizeSelection])

  const elementHeight = useMemo(() => ({ minHeight: `${containerWidth / 7}px` }), [containerWidth])
  const cellEvents = useMemo(() => range
    ? isMouseDown
      ? { onClick: mouseDown, onMouseOver: mouseOver }
      : { onClick: mouseDown }
    : { onClick: onInput }, [isMouseDown, mouseDown, mouseOver, onInput, range])

  const dayItems = []
  for (let i = 1; i <= daysCount; i++) {
    dayItems.push(
      <DayView
        {...props}
        key={i}
        day={i}
        dayOfTheWeek={dayOfTheWeek}
        monthDaysCount={daysCount}
        normalizedSelectedRange={currentSelectedRange}
        currentMonth={currentMonth}
        currentYear={currentYear}
        style={elementHeight}
        {...cellEvents}
      />
    )
  }
  return (
    <MonthViewContainer id="MonthContainer">
      {WeekHeaders.map(day => (<MonthViewHeader>{day}</MonthViewHeader>))}
      {dayItems}
    </MonthViewContainer>
  )
}

MonthView.propTypes = {
  currentYear: PropTypes.number.isRequired,
  currentMonth: PropTypes.number.isRequired,
  normalizedVal: PropTypes.array.isRequired,
  onInput: PropTypes.func.isRequired,
  range: PropTypes.bool,
  containerWidth: PropTypes.number,
}

MonthView.defaultProps = {
  containerWidth: 100
}

export default MonthView
