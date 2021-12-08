import React, { useCallback, useMemo } from "react"
import PropTypes from "prop-types"
import dayjs from "dayjs"
import { DayItem, DayContainer } from "./styles"

const DayView = ({
  calendarPayload, customDayRender, dayOfTheWeek, day, style, currentYear, currentMonth, onClick, onMouseOver,
  minDate, maxDate, initDate, disabledDatesTodayDate, normalizedSelectedRange: [start, end], monthDaysCount, dateFormat
}) => {
  const cellStyle = useMemo(
    () => day === 1 ? { ...style, gridColumn: `${dayOfTheWeek + 1}` } : style,
    [day, dayOfTheWeek, style]
  )
  const normalizedDay = useMemo(
    () => new Date([currentYear, currentMonth + 1, day]).valueOf(),
    [currentMonth, currentYear, day]
  )

  const disabledDates = useMemo(
    () => (disabledDatesTodayDate && normalizedDay < initDate) || (minDate && normalizedDay < minDate)
    || (maxDate && normalizedDay > maxDate) ? "disabled-date no-pointer-events" : "",
    [disabledDatesTodayDate, initDate, maxDate, minDate, normalizedDay]
  )

  const dayPayload = useMemo(() => {
    if (calendarPayload) {
      const key = dayjs(normalizedDay).format(dateFormat)
      return [calendarPayload[key], key]
    }
    return undefined
  }, [calendarPayload, dateFormat, normalizedDay])

  const selectionClass = useMemo(() => {
    if (normalizedDay === start) {
      return `selected first ${start === end ? "last" : ""}`
    }
    if (normalizedDay === end) {
      return "selected last"
    } if (normalizedDay > start && normalizedDay < end) {
      return "inSelectRange"
    }
    return ""
  }, [end, normalizedDay, start])

  const layoutClass = useMemo(() => {
    const diff = (day + dayOfTheWeek) % 7
    return `${calendarPayload ? "withContent" : ""} ${diff === 0 || day === monthDaysCount
      ? "lastInRow" : ""} ${diff === 1 || day === 1 ? "firstInRow" : ""} ${initDate === normalizedDay ? "startedDay" : ""}`
  }, [calendarPayload, day, dayOfTheWeek, initDate, monthDaysCount, normalizedDay])

  const cellClasses = useMemo(
    () => `${disabledDates} ${selectionClass} ${layoutClass}`,
    [disabledDates, layoutClass, selectionClass]
  )

  const handleMouseOver = useCallback(() => { onMouseOver(normalizedDay) }, [normalizedDay, onMouseOver])
  const handleClick = useCallback(() => { onClick(normalizedDay) }, [normalizedDay, onClick])

  return (
    <DayItem
      type="button"
      className={cellClasses}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      style={cellStyle}
      id={day}
    >
      <DayContainer>{day}</DayContainer>
      {dayPayload && customDayRender && customDayRender(...dayPayload)}
    </DayItem>
  )
}

DayView.propTypes = {
  day: PropTypes.number.isRequired,
  dayOfTheWeek: PropTypes.number.isRequired,
  monthDaysCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  initDate: PropTypes.number.isRequired,
  minDate: PropTypes.number,
  maxDate: PropTypes.number,
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  dateFormat: PropTypes.string.isRequired,
  normalizedSelectedRange: PropTypes.array.isRequired,
  calendarPayload: PropTypes.object,
  style: PropTypes.object,
  customDayRender: PropTypes.func,
  disabledDatesTodayDate: PropTypes.bool,
  onMouseOver: PropTypes.func
}

DayView.defaultProps = {
  onMouseOver: () => null
}

export default DayView
