/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import dayjs from "dayjs"
import padStart from "lodash/padStart"
import padEnd from "lodash/padEnd"
import WithCloseWindow from "@Core/RenderProps/withCloseWindow"
import removeNonNumericValues from "@Utils/String/removeNonNumericValues"
// import Calendar from "@/Components/Calendar"
import { PRESENT_DATE_FORMAT } from "@constants"
import PureUpdateArrayItems from "@Utils/Arrays/PureUpdateArrayItems"
import memoizeOne from "memoize-one"
import RenderOverlayMenu from "@Components/OverlayMenu/RenderOverlayMenu"
import { AlwaysOpenContainer } from "@Components/Fields/Select"
import { SuggestDataInput, DatePickerCalendarContainer } from "./styles"
import styled from "styled-components"
import {Calendar, Col, Row, Select} from "antd";
import { ToggleIconContainer, ToggleIndicator } from "@Components/Fields/Select/styles"


const normalizeSelection = (selection) => {
  const nSel = selection - 1
  return nSel > 0 ? nSel : 0
}
const unwrapValue = (dateFormat) => (v) => {
  if (v) {
    const date = dayjs(v, dateFormat)
    return [
      String(padStart(date.get("date"), 2, "0")),
      String(padStart(date.get("month") + 1, 2, "0")),
      String(date.get("year"))
    ]
  }
  return ["DD", "MM", "YYYY"]
}

class DatePicker extends PureComponent {
  getNormalizeValue = memoizeOne((value, range, additionalValue) => range && additionalValue
    ? [value, additionalValue]
    : value)

  // Приводим любые даты к числам
  getInputValue = memoizeOne((value) => Array.isArray(value)
    // eslint-disable-next-line max-len
    ? `${value[0] ? dayjs(value[0], PRESENT_DATE_FORMAT).format(PRESENT_DATE_FORMAT) : ""} - ${value[1] ? dayjs(value[1], PRESENT_DATE_FORMAT).format(PRESENT_DATE_FORMAT) : ""}`
    : value ? dayjs(value, PRESENT_DATE_FORMAT).format(PRESENT_DATE_FORMAT) : "")

  constructor(props) {
    super(props)
    this.refSuggestInputContainer = React.createRef()
    this.refHiddenInput = React.createRef()
    this.state = {
      suggestData: undefined,
      open: false,
      suggestDataInputIndex: 0,
      dateRange: {}
    }
  }

  static getDerivedStateFromProps({ maxDate, minDate, formPayload }, prevState) {
    const newDataRange = {
      minDate: minDate
        ? minDate.type === "link"
          ? formPayload[minDate.value]
            ? formPayload[minDate.value]
            : undefined
          : minDate.value
        : undefined,
      maxDate: maxDate
        ? maxDate.type === "link"
          ? formPayload[maxDate.value]
            ? formPayload[maxDate.value]
            : undefined
          : maxDate.value
        : undefined
    }
    if (prevState.dateRange.minDate !== newDataRange.minDate || prevState.dateRange.maxDate !== newDataRange.maxDate) {
      return { dateRange: newDataRange }
    }
    return null
  }

  componentDidMount() {
    const { props: { inputRef, id }, refHiddenInput: { current: refHiddenInput } } = this
    inputRef(id, refHiddenInput)
  }

  componentDidUpdate(prevProps, prevState) {
    const { state: { open } } = this
    if (open !== prevState.open) {
      const {
        props: { dateFormat, value, range, rangeId, formPayload },
        state: { suggestData },
      } = this
      if (open) {
        if (!suggestData) {
          const dateUnWrapper = unwrapValue(dateFormat)
          const normalizedValue = this.getNormalizeValue(value, range, formPayload[rangeId])
          const [
            startDay = "DD", startMonth = "MM", startYear = "YYYY", endDay = "DD", endMonth = "MM", endYear = "YYYY"
          ] = Array.isArray(value)
            ? normalizedValue.map(dateUnWrapper).flat()
            : dateUnWrapper(normalizedValue)
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            suggestData: range
              ? [startDay, startMonth, startYear, endDay, endMonth, endYear]
              : [startDay, startMonth, startYear]
          })
        }
        setTimeout(() => {
          this.getSuggestInputByIndex(0)?.focus()
        }, 150)
      } else {
        this.checkAndEmmitSuggestValue()
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          suggestData: undefined,
          suggestDataInputIndex: 0
        })
      }
    }
  }

  checkAndEmmitSuggestValue = () => {
    const { state: { suggestData }, } = this
    if (suggestData && suggestData.every((v) => !/\D/g.test(v))) {
      this.emitSuggestData()
    }
  }

  componentWillUnmount() {
    const { props: { inputRef, id } } = this
    inputRef(id)
    this.checkAndEmmitSuggestValue()
  }

  onInitialInput = ({ target: { value } }) => {
    const { range } = this.props
    this.setState({ suggestData: range
      ? [value, "MM", "YYYY", "DD", "MM", "YYYY"]
      : [value, "MM", "YYYY"]
    })
  }

  getSuggestInputByIndex = (index) => this.refSuggestInputContainer.current?.children[0].children[index].children[0].children[0]

  openCalendar = () => {
    const { state: { open }, props: { onFocus, disabled } } = this
    if (!open && !disabled) {
      onFocus()
      this.setState({ open: true })
    }
  }

  closeCalendar = () => {
    const { props: { onBlur } } = this
    onBlur()
    this.setState({ open: false })
  }

  emitCalendarValue = (value, id) => {
    const { props: { onInput, rangeId } } = this
    if (rangeId) {
      const [val, secondVal] = value
      onInput(val, id)
      onInput(secondVal, rangeId)
    } else {
      onInput(value, id)
    }
  }

  onCalendarInput = (value, id) => {
    this.emitCalendarValue(value, id)
    this.setState({ suggestData: undefined })
    this.closeCalendar()
  }

  handleSubmitSuggestDate = () => {
    this.emitSuggestData()
    this.closeCalendar()
  }

  updateActiveInputIndex = ({ target: { id } }) => {
    this.setState({ suggestDataInputIndex: Number(id) })
  }

  handleManualDateInput = ({ target: { value, id, selectionStart } }) => {
    this.updateSuggestDate(value, id, selectionStart)
  }

  normalizeDateInput = (date, id) => {
    const { state: { suggestData } } = this
    const currentDate = dayjs()
    const { month, year } = id > 2
      ? { month: suggestData[4], year: suggestData[5] }
      : { month: suggestData[1], year: suggestData[2] }

    const suggestedDate = dayjs(new Date(
      removeNonNumericValues(year) || currentDate.get("year"),
      removeNonNumericValues(month) || currentDate.get("month"),
      1
    ))

    if (id % 3 === 1) {
      return Number(date || 0) > 12 ? 12 : date
    }
    const maxAvailableDate = suggestedDate.add(1, "month").set("second", -1).get("date")
    return maxAvailableDate > date ? date : maxAvailableDate
  }

  yearInput = (year) => year.length > 4 ? year.slice(0, 4) : year

  dayInput = (day, id) => {
    const nDay = day === "00" ? "01" : day
    switch (nDay.length) {
      case 0:
        return nDay
      case 1:
        return nDay.startsWith("0") ? nDay : `0${nDay}`
      case 2:
        return this.normalizeDateInput(nDay, id)
      default:
        return this.normalizeDateInput(nDay.startsWith("0") ? nDay.slice(1, 3) : nDay.slice(0, 2), id)
    }
  }

  updateSuggestDate = (value, id, selectionStart, DontAutoFocusNextInput) => {
    const {
      state: { suggestData, dateRange },
      props: { range, maxDate, dateFormat, minDate }

    } = this
    const originInput = removeNonNumericValues(value)

    const date = (id % 3 === 2 ? this.yearInput : this.dayInput)(originInput, id)
    let padValue
    switch (id % 3) {
      case 1:
        padValue = padEnd(date, 2, "M")
        break
      case 2:
        padValue = padEnd(date, 4, "Y")
        break
      default:
        padValue = padEnd(date, 2, "D")
        break
    }
    const nextSuggestData = PureUpdateArrayItems(suggestData, id, padValue)
    const [startDay, startMonth, startYear, endDay, endMonth, endYear] = nextSuggestData
    // если ввод периода, то проверяем заполненость дат и если они заполненны сравниваем
    const { firstDateFilled, secondDateFilled, allDatesFilled } = nextSuggestData.reduce((acc, elem, i) => {
      if (removeNonNumericValues(elem).length !== (i % 3 === 2 ? 4 : 2)) {
        if (i > 2) {
          acc.secondDateFilled = false
        } else {
          acc.firstDateFilled = false
        }
        acc.allDatesFilled = false
      }
      return acc
    }, { firstDateFilled: true, secondDateFilled: true, allDatesFilled: true })

    let dateIsValid = true
    if (range && allDatesFilled) {
      // проверяем что дата конца больше даты начала
      if (dayjs(new Date(endYear, endMonth, endDay)).diff(dayjs(new Date(startYear, startMonth, startDay))) < 0) {
        dateIsValid = false
      }
    } else if (maxDate) {
      if (range && secondDateFilled) {
        if (dayjs(dateRange.maxDate, dateFormat).diff(dayjs(new Date(endYear, endMonth - 1, endDay))) < 0) {
          dateIsValid = false
        }
      } else if (firstDateFilled) {
        if (dayjs(dateRange.maxDate, dateFormat).diff(dayjs(new Date(startYear, startMonth - 1, startDay))) < 0) {
          dateIsValid = false
        }
      }
    } else if (minDate && firstDateFilled) {
      if (dayjs(dateRange.minDate, dateFormat).diff(dayjs(new Date(startYear, startMonth - 1, startDay))) > 0) {
        dateIsValid = false
      }
    }
    if (dateIsValid) {
      if (
        !DontAutoFocusNextInput && (id % 3 === 2
          ? range && id === "2" && originInput.length >= 4 && selectionStart >= 4
          : originInput.length > 2 && selectionStart >= 2
        )) {
        this.focusNextSuggestInput()
      }
      this.setState({ suggestData: nextSuggestData })
    } else {
      // отменяем старый расчет
      this.getSuggestInputByIndex(id).value = nextSuggestData[id]
    }
    setTimeout(() => this.getSuggestInputByIndex(id).setSelectionRange(selectionStart, selectionStart), 4)
  }

  handleKeyUp = (e) => {
    const { state: { suggestData } } = this
    const { key, shiftKey, target: { id, selectionStart } } = e
    const updatedValue = removeNonNumericValues(suggestData[id], 0)
    const caretPosition = normalizeSelection(selectionStart)
    switch (key) {
      case "Esc":
        this.setState({ suggestData: updatedValue })
        this.closeCalendar()
        break
      case "Enter": {
        const index = suggestData.findIndex(v => /\D/g.test(v))
        if (index >= 0) {
          this.getSuggestInputByIndex(index).focus()
        } else {
          this.handleSubmitSuggestDate()
        }
        break
      }
      case "Backspace":
        if (selectionStart === 0) {
          this.focusPrevSuggestInput()
        }
        break
      case "Delete":
        if (updatedValue.length - 1 === caretPosition) {
          this.focusNextSuggestInput()
        } else {
          setTimeout(() => this.getSuggestInputByIndex(id).setSelectionRange(selectionStart + 1, selectionStart + 1), 5)
        }
        break
      case "Tab":
        if (shiftKey) {
          this.focusPrevSuggestInput()
        } else {
          this.focusNextSuggestInput()
        }
        e.preventDefault()
        e.stopPropagation()
        break
      case "ArrowUp":
      case "ArrowDown": {
        e.stopPropagation()
        e.preventDefault()
        const nextValue = Number(updatedValue) + 1 * (key === "ArrowUp" ? 1 : -1) * (shiftKey ? 10 : 1)
          ** (updatedValue.length - caretPosition - 1)

        if (key === "ArrowUp" ? String(nextValue).length <= suggestData[id].length : nextValue > 0) {
          this.updateSuggestDate(String(nextValue), id, selectionStart, true)
        }
        break
      }
      case "ArrowRight":
        e.stopPropagation()
        if (updatedValue.length - 1 === caretPosition) {
          this.focusNextSuggestInput()
        }
        break
      case "ArrowLeft":
        e.stopPropagation()
        if (caretPosition === 0) {
          this.focusPrevSuggestInput()
        }
        break
      default:
        break
    }
  }

  focusNextSuggestInput = () => {
    const {
      props: { range }, state: { suggestDataInputIndex },
    } = this
    const nextValue = suggestDataInputIndex + 1
    if (nextValue < (range ? 6 : 3)) {
      const input = this.getSuggestInputByIndex(nextValue)
      input.focus()
      input.setSelectionRange(0, 1)
    }
  }

  focusPrevSuggestInput = () => {
    const { state: { suggestDataInputIndex } } = this
    const nextValue = suggestDataInputIndex - 1
    if (nextValue >= 0) {
      const input = this.getSuggestInputByIndex(nextValue)
      input.focus()
      input.setSelectionRange(1, 2)
    }
  }

  emitSuggestData = () => {
    const {
      props: { range, id, value, dateFormat },
      state: { suggestData: [startDay, startMonth, startYear, endDay, endMonth, endYear] }
    } = this
    const nextDate = range
      ? [
        dayjs(new Date(startYear, startMonth - 1, startDay)).format(dateFormat),
        dayjs(new Date(endYear, endMonth - 1, endDay)).format(dateFormat)
      ]
      : dayjs(new Date(startYear, startMonth - 1, startDay)).format(dateFormat)
    if (range ? (value[0] !== nextDate[0] || value[1] !== nextDate[1]) : value !== nextDate) {
      this.emitCalendarValue(nextDate, id)
    }
    this.setState({ suggestData: undefined })
  }

  render() {
    const {
      refSuggestInputContainer, refHiddenInput,
      props: {
        style, className, disabled, range, placeholder, children, allWaysOpen, tipMaxSize,
        containerStatic, value, dateFormat, disabledDatesTodayDate, rangeId, formPayload
      },
      state: { suggestData, open, dateRange }
    } = this
    const normalizedValue = this.getNormalizeValue(value, range, formPayload[rangeId])
    const normalizedDate = this.getInputValue(normalizedValue)
    // todo в таблице при открываетии прыгает
    // надо верстку править
    return (
      <RenderOverlayMenu
        onOpenOverlayMenu={this.openCalendar}
        renderOverlayMenu={allWaysOpen || open}
      >
        {(overlayBoundRef, onOpenOverlayMenu, OverlayMenu) => {
          const DropDownWrapperComponent = allWaysOpen ? AlwaysOpenContainer : OverlayMenu

          return (
            <WithCloseWindow closeWindow={this.closeCalendar} byKey={open}>
              {(onMouseDown) => (
                <div
                  onMouseDown={onMouseDown}
                  style={style}
                  className={`display-flex pos-relative flex-full-with fd-column ${className}`}
                >
                  <div
                    ref={overlayBoundRef}
                    className="w-100 input-box display-flex flex-min-with bs-date-picker-input"
                    disabled={disabled}
                    onClick={onOpenOverlayMenu}
                  >
                    <input
                      type="text"
                      className="no-pointer-events opacity-0 pos-absolute"
                      onFocus={onOpenOverlayMenu}
                      style={{ height: "var(--height-input)" }}
                      onInput={this.onInitialInput}
                      ref={refHiddenInput}
                    />
                    <div
                      className="input-control display-flex h-100 "
                      style={{ height: "var(--height-input)" }}
                    >
                      <div
                        className="pos-relative flex-container"
                        ref={refSuggestInputContainer}
                      >
                        {suggestData
                          ? (
                            <div
                              className="display-flex a-i-center color-blackDarken-1"
                              style={{ height: "var(--height-input)" }}
                            >
                              {suggestData.reduce((acc, dateItem, i) => {
                                acc.push(
                                  <div key={i} className="display-flex a-i-center">
                                    <div className="pos-relative color-white">
                                      <SuggestDataInput
                                        id={i}
                                        autoComplete="off"
                                        onInput={this.handleManualDateInput}
                                        onFocus={this.updateActiveInputIndex}
                                        className="color-black fs-14"
                                        onKeyDown={this.handleKeyUp}
                                        value={dateItem}
                                      />
                                      {dateItem}
                                    </div>
                                    {i < suggestData.length - 1 ? range && i === 2 ? <span>&nbsp;-&nbsp;</span> : "." : ""}
                                  </div>
                                )
                                return acc
                              }, [])}
                            </div>
                          )
                          : normalizedDate
                            ? (
                              <div className="m-t-a m-b-a fs-14">
                                {normalizedDate}
                              </div>
                            )
                            : (
                              <div className="m-t-a m-b-a color-grey-c4 fs-12">
                                {placeholder}
                              </div>
                            )}
                      </div>
                    </div>
                    {children}
                    {!allWaysOpen && (
                      <ToggleIconContainer
                        type="button"
                        onClick={open ? this.closeCalendar : this.openCalendar}
                      >
                        <ToggleIconContainer/>
                      </ToggleIconContainer>
                    )}
                  </div>
                  <DropDownWrapperComponent
                    axis="y"
                    containerMargin="2px"
                    maxSize={tipMaxSize}
                    minSize="min-content"
                    positionStatic={allWaysOpen}
                    onMouseDown={onMouseDown}
                    renderTip={false}
                  >
                    <DatePickerCalendarContainer
                      allWaysOpen={allWaysOpen}
                      containerStatic={containerStatic}
                    >
                      {/*<Calendar*/}
                      {/*  {...this.props}*/}
                      {/*  value={normalizedValue}*/}
                      {/*  dateFormat={dateFormat}*/}
                      {/*  range={range}*/}
                      {/*  dateRange={dateRange}*/}
                      {/*  disabledDatesTodayDate={disabledDatesTodayDate}*/}
                      {/*  onInput={this.onCalendarInput}*/}
                      {/*/>*/}
                    </DatePickerCalendarContainer>
                  </DropDownWrapperComponent>
                </div>
              )}
            </WithCloseWindow>
          )
        }}
      </RenderOverlayMenu>
    )
  }
}

DatePicker.propTypes = {
  formPayload: PropTypes.object.isRequired,
  onInput: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  dateFormat: PropTypes.string,
  range: PropTypes.bool,
  allWaysOpen: PropTypes.bool,
  styleWrapperCalendar: PropTypes.string,
  tipMaxSize: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  rangeId: PropTypes.string, // если нужно собрать поле из двух источников даты
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  style: PropTypes.object,
  // сделано специально для типсы дедлайна брифа ридонли
  // плохо работает для периодов, так как стороки дат не окращены полнсостью, только старт и конец
  containerStatic: PropTypes.bool,
  disabledDatesTodayDate: PropTypes.bool,
  // todo сделать стили при disabled
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  inputRef: PropTypes.func,
  onBlur: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

DatePicker.defaultProps = {
  value: [],
  dateFormat: PRESENT_DATE_FORMAT,
  tipMaxSize: "310",
  placeholder: "DD.MM.YYYY - DD.MM.YYYY",
  className: "",
  onFocus: () => null,
  inputRef: () => null,
  onBlur: () => null,
}

export default DatePicker
