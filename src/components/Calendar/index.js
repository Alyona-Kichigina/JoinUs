import React, { Component } from "react"
import PropTypes from "prop-types"
import dayjs from "dayjs"
import { DEFAULT_DATE_FORMAT } from "@constants"
import memoizeOne from "memoize-one"
import debounce from "@Utils/debounce"
import MonthView from "./MonthView"
import YearView from "./YearView"
import DecadeView from "./DecadeView"
import { CALENDAR_DECADE_VIEW, CALENDAR_MONTH_VIEW, CALENDAR_YEAR_VIEW, MonthNames } from "./constants"
import { NavigationButtonsContainer, NavigationButton, NavigationLabel } from "./styles"


export const CalendarViews = {
  [CALENDAR_MONTH_VIEW]: MonthView,
  [CALENDAR_YEAR_VIEW]: YearView,
  [CALENDAR_DECADE_VIEW]: DecadeView
}

class Calendar extends Component {
  castDateRangesToValue = memoizeOne(({ minDate, maxDate }) => ({
    minDate: minDate ? this.parseDate(minDate).valueOf() : undefined,
    maxDate: maxDate ? this.parseDate(maxDate).valueOf() : undefined
  }))

  getCalendarLabel = memoizeOne((calendarView, currentMonth, currentYear) => {
    if (calendarView === CALENDAR_DECADE_VIEW) {
      const dividedYear = currentYear / 10
      return `${Math.floor(dividedYear) * 10} - ${Math.ceil(dividedYear) * 10}`
    } if (calendarView === CALENDAR_DECADE_VIEW) {
      return currentYear
    }
    return `${MonthNames[currentMonth]} ${currentYear}`
  })

  scrollView = debounce((direction) => {
    this.onNavigation(direction)()
  }, 50)

  constructor(props) {
    super(props)
    this.refContainer = React.createRef()
    this.state = {
      observer: new ResizeObserver(this.updateContainerWidth),
      calendarView: props.initCalendarView,
      currentYear: undefined,
      currentMonth: undefined,
      castedToValueInitDay: this.parseDate(props.initDate).valueOf(),
      normalizedVal: [],
      prevVal: undefined,
      containerWidth: 0
    }
  }

  static getDerivedStateFromProps({ value, range, dateFormat, initDate }, { prevVal }) {
    if (value !== prevVal) {
      const startDate = Array.isArray(value) ? value[0] : value
      const parsedDate = dayjs(startDate === undefined || startDate === "" || startDate === 0 ? initDate : startDate, dateFormat)
      return {
        prevVal: value,
        normalizedVal: range
          ? value.map(day => dayjs(day, dateFormat).valueOf())
          : [dayjs(value, dateFormat).valueOf(), dayjs(value, dateFormat).valueOf()],
        currentYear: parsedDate.year(),
        currentMonth: parsedDate.month()
      }
    }
    return null
  }

  componentDidMount() {
    const { state: { observer }, refContainer } = this
    observer.observe(refContainer.current, {})
    // реакт не всегда дает работать эвенту
    refContainer.current.onwheel = this.handleWheel
  }

  componentWillUnmount() {
    const { state: { observer } } = this
    observer.disconnect()
  }

  handleWheel = (e) => {
    // нужно гасить каждый эвент
    const { disabledNavigation } = this.props
    if (!disabledNavigation) {
      e.preventDefault()
      e.stopPropagation()
      this.scrollView(e.deltaY > 0)
    }
  }

  setCalendarView = () => {
    this.setState(({ calendarView }) => ({
      calendarView: calendarView === CALENDAR_MONTH_VIEW ? CALENDAR_YEAR_VIEW : CALENDAR_DECADE_VIEW
    }))
  }

  selectMonthOrYearAndChangeView = (calendarItem) => {
    this.setState(({ calendarView }) => calendarView === CALENDAR_DECADE_VIEW
      ? { currentYear: calendarItem, calendarView: CALENDAR_YEAR_VIEW }
      : { currentMonth: calendarItem, calendarView: CALENDAR_MONTH_VIEW })
  }

  onNavigation = (inc) => () => {
    const { state: { calendarView } } = this
    if (calendarView === CALENDAR_DECADE_VIEW) {
      this.setState(({ currentYear }) => ({ currentYear: inc ? currentYear + 10 : currentYear - 10 }))
    } if (calendarView === CALENDAR_DECADE_VIEW) {
      this.setState(({ currentYear }) => ({ currentYear: inc ? currentYear + 1 : currentYear - 1 }))
    } else {
      this.setState(({ currentYear, currentMonth }) => inc
        ? currentMonth + 1 > 11 ? { currentMonth: 0, currentYear: currentYear + 1 } : { currentMonth: currentMonth + 1 }
        : currentMonth - 1 < 0 ? { currentMonth: 11, currentYear: currentYear - 1 } : { currentMonth: currentMonth - 1 })
    }
  }

  onYearNavigation = (inc) => () => {
    const { state: { calendarView } } = this
    if (calendarView === CALENDAR_DECADE_VIEW) {
      this.setState(({ currentYear }) => ({ currentYear: inc ? currentYear + 20 : currentYear - 20 }))
    } if (calendarView === CALENDAR_DECADE_VIEW) {
      this.setState(({ currentYear }) => ({ currentYear: inc ? currentYear + 10 : currentYear - 10 }))
    } else {
      this.setState(({ currentYear }) => ({ currentYear: inc ? currentYear + 1 : currentYear - 1 }))
    }
  }

  parseDate = (date) => {
    const { props: { dateFormat } } = this
    return dayjs(date, dateFormat)
  }

  updateContainerWidth = ([{ target: { clientWidth } }]) => {
    this.setState({ containerWidth: clientWidth })
  }

  handleInput = (day) => {
    const { props: { range, onInput, dateFormat, id } } = this
    if (range) {
      onInput(day.map((day, index) => dayjs(index === 1 && day === day[1] ? day + 86399999 : day).format(dateFormat)), id)
    } else {
      onInput(dayjs(day).format(dateFormat), id)
    }
  }

  render() {
    const {
      refContainer,
      props: {
        disabledNavigation, range, dateFormat, dateRange, disabledDatesTodayDate, customDayRender, calendarPayload,
        className, style
      },
      state: { calendarView, currentYear, currentMonth, normalizedVal, castedToValueInitDay, containerWidth }
    } = this
    const CurrentView = CalendarViews[calendarView]
    const normalizedDateRange = this.castDateRangesToValue(dateRange)
    return (
      <div ref={refContainer} className={className} style={style}>
        <NavigationButtonsContainer className="whitespace-nowrap">
          {!disabledNavigation && (
          <>
            <NavigationButton
              type="button"
              onClick={this.onYearNavigation(false)}
            >
              PrevYearIcon
            </NavigationButton>
            <NavigationButton
              type="button"
              onClick={this.onNavigation(false)}
            >
              PrevIcon
            </NavigationButton>
          </>
          )}
          <NavigationLabel
            type="button"
            disabled={CurrentView === DecadeView || disabledNavigation}
            onClick={this.setCalendarView}
          >
            { this.getCalendarLabel(calendarView, currentMonth, currentYear) }
          </NavigationLabel>
          {!disabledNavigation && (
          <>
            <NavigationButton
              type="button"
              onClick={this.onNavigation(true)}
            >
              NextIcon
            </NavigationButton>
            <NavigationButton
              type="button"
              onClick={this.onYearNavigation(true)}
            >
              NextYearIcon
            </NavigationButton>
          </>
          )}
        </NavigationButtonsContainer>
        <CurrentView
          initDate={castedToValueInitDay}
          normalizedVal={normalizedVal}
          containerWidth={containerWidth}
          currentYear={currentYear}
          currentMonth={currentMonth}
          calendarPayload={calendarPayload}
          customDayRender={customDayRender}
          range={range}
          dateFormat={dateFormat}
          minDate={normalizedDateRange.minDate}
          maxDate={normalizedDateRange.maxDate}
          disabledDatesTodayDate={disabledDatesTodayDate}
          onPrevRange={this.onNavigation(false)}
          onNextRange={this.onNavigation(true)}
          onSelect={this.selectMonthOrYearAndChangeView}
          onInput={this.handleInput}
        />
      </div>
    )
  }
}

Calendar.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onInput: PropTypes.func,
  initDate: PropTypes.string,
  range: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  dateFormat: PropTypes.string.isRequired,
  initCalendarView: PropTypes.oneOf([CALENDAR_MONTH_VIEW, CALENDAR_YEAR_VIEW, CALENDAR_DECADE_VIEW]),
  dateRange: PropTypes.shape({
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
  }),
  calendarPayload: PropTypes.object,
  customDayRender: PropTypes.func,
  disabledDatesTodayDate: PropTypes.bool,
  disabledNavigation: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

Calendar.defaultProps = {
  // eslint-disable-next-line newline-per-chained-call
  initDate: dayjs().set("minute", 0).set("hour", 0).set("second", 0).set("millisecond", 0).format(DEFAULT_DATE_FORMAT),
  value: [],
  initCalendarView: CALENDAR_MONTH_VIEW,
  dateRange: {},
  onInput: () => null
}

export default Calendar
