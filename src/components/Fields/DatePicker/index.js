import React, {Component, useCallback} from 'react';
import RenderOverlayMenu from "@Components/OverlayMenu/RenderOverlayMenu"
import WithCloseWindow from "@Core/RenderProps/withCloseWindow"
import {BlockYear, ButtonContainer, DatePickerCalendarContainer, ToggleIcon} from "./styles";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import {PRESENT_DATE_FORMAT} from "@constants"
import { Calendar, Select, Col, Row } from 'antd';
import moment from "moment";
import Sel from "@Components/Fields/Select";
import withDatePickerHoc from "../../../Core/Decorators/withDatePicker";
import {arrowDown, arrowUp} from "../../../pages/Constants";

const MonthNames = [
  {
    ID: 0,
    SYS_NAME:  "January"
  },
  {
    ID: 1,
    SYS_NAME:  "February"
  },
  {
    ID: 2,
    SYS_NAME:  "March"
  },
  {
    ID: 3,
    SYS_NAME:  "April"
  },
  {
    ID: 4,
    SYS_NAME:  "May"
  },
  {
    ID: 5,
    SYS_NAME:  "June"
  },
  {
    ID: 6,
    SYS_NAME:  "July"
  },
  {
    ID: 7,
    SYS_NAME:  "August"
  },
  {
    ID: 8,
    SYS_NAME:  "September"
  },
  {
    ID: 9,
    SYS_NAME:  "October"
  },
  {
    ID: 10,
    SYS_NAME:  "November"
  },
  {
    ID: 11,
    SYS_NAME:  "December"
  },
]

class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      valueForCalendar: moment(),
      valueSelect: moment().month(),
      year: new Date().getFullYear()
    }
  }

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

  componentDidUpdate(prevProps, prevState) {
    const { state: { open } } = this
    if (open !== prevState.open) {
      const {
        props: { value },
      } = this
      this.editValueForCalendar(value)
    }
  }

  onCalendarInput = (value) => {
    const { props: { onInput, dateFormat, id } } = this
    onInput(dayjs(value._d).format(dateFormat), id)
    this.closeCalendar()
  }

  editValueForCalendar = (value) => {
    if (value) {
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      this.setState({ valueForCalendar: moment(new Date(value.replace(pattern,'$3-$2-$1'))) })
    }
  }
  handleSelect = (value) => {
    const month = moment().month(value)
    this.setState({
      valueSelect: value,
      valueForCalendar: month
    })
    // console.log(month)
  }

  getToday = () => {
    const { props: { onInput, dateFormat, id } } = this
    this.setState({valueForCalendar: moment()})
    onInput(moment(new Date()).format(dateFormat), id)
  }

  editYear = (val) => {
    const { year } = this.state
    switch (val) {
      case "minus":
        this.setState({year: year - 1})
        break
      case "plus":
        this.setState({year: year + 1})
        break
    }
    this.aaa()
  }

  aaa = (val) => {
    const { year } = this.state
    console.log(year)
    const yearMoment = moment().year(year)
    this.setState({
      valueForCalendar: yearMoment
    })
  }

  render() {
    const {
      props: {
        style, className, disabled, placeholder, children, tipMaxSize,
        value
      },
      state: { open, valueForCalendar, valueSelect, year  }
    } = this

    return (
      <RenderOverlayMenu
        onOpenOverlayMenu={this.openCalendar}
        renderOverlayMenu={open}
      >
        {
          (overlayBoundRef, onOpenOverlayMenu, OverlayMenu) => {
            return (
              <WithCloseWindow closeWindow={this.closeCalendar} byKey={open}>
                {(onMouseDown) => (
                  <div
                    onMouseDown={onMouseDown}
                    style={style}
                    className={`flex relative flex-auto flex-col ${className}`}
                  >
                    <div
                      ref={overlayBoundRef}
                      className="w-full input-box flex flex-min-with"
                      disabled={disabled}
                      onClick={onOpenOverlayMenu}
                      style={style}
                    >
                      <input
                        type="text"
                        className="pointer-events-auto opacity-0 absolute"
                        onFocus={onOpenOverlayMenu}
                        style={{ height: "var(--height-input)" }}
                      />
                      <div
                        className="input-control flex h-full "
                        style={{ height: "var(--height-input)" }}
                      >
                        <div className="relative flex-container">
                          {
                           value.length > 0
                            ? (
                              <div className="m-t-a m-b-a fs-14 ls-02">
                                {value}
                              </div>
                            )
                            : (
                              <div className="m-t-a m-b-a color-light-blue-2 fs-14">
                                {placeholder}
                              </div>
                            )
                          }
                        </div>
                      </div>
                      {children}
                      <ToggleIcon
                        open={open}
                        onClick={open ? this.closeCalendar : this.openCalendar}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M3.33268 2.66699C2.22811 2.66699 1.33268 3.56242 1.33268 4.66699V12.667C1.33268 13.7716 2.22811 14.667 3.33268 14.667H12.666C13.7706 14.667 14.666 13.7716 14.666 12.667V4.66699C14.666 3.56242 13.7706 2.66699 12.666 2.66699H3.33268ZM13.3327 6.00033H2.66602V13.3337H13.3327V6.00033Z" fill="#56809F"/>
                          <rect x="3.66797" y="7.33301" width="2" height="2" rx="0.5" fill="#56809F"/>
                          <rect x="3.66797" y="10" width="2" height="2" rx="0.5" fill="#56809F"/>
                          <rect x="7" y="7.33301" width="2" height="2" rx="0.5" fill="#56809F"/>
                          <rect x="7" y="10" width="2" height="2" rx="0.5" fill="#56809F"/>
                          <rect x="10.334" y="7.33301" width="2" height="2" rx="0.5" fill="#56809F"/>
                          <path d="M3.33398 2.66634C3.33398 1.92996 3.93094 1.33301 4.66732 1.33301C5.4037 1.33301 6.00065 1.92996 6.00065 2.66634V3.33301H3.33398V2.66634Z" fill="#56809F"/>
                          <path d="M10 2.66634C10 1.92996 10.597 1.33301 11.3333 1.33301C12.0697 1.33301 12.6667 1.92996 12.6667 2.66634V3.33301H10V2.66634Z" fill="#56809F"/>
                        </svg>
                      </ToggleIcon>
                      </div>
                    <OverlayMenu
                      axis="y"
                      containerMargin="2px"
                      maxSize={tipMaxSize}
                      minSize="min-content"
                      onMouseDown={onMouseDown}
                      renderTip={false}
                    >
                      <DatePickerCalendarContainer>
                        <Calendar
                          value={valueForCalendar}
                          fullscreen={false}
                          headerRender={({ value, type, onChange, onTypeChange }) => {
                            const start = 0;
                            const end = 12;
                            const monthOptions = [];
                            const current = value.clone();
                            const localeData = value.localeData();
                            const months = [];
                            for (let i = 0; i < 12; i++) {
                              current.month(i);
                              months.push(localeData.monthsShort(current));
                            }
                            for (let index = start; index < end; index++) {
                              monthOptions.push(
                                <Select.Option className="month-item" key={`${index}`}>
                                  {months[index]}
                                </Select.Option>,
                              );
                            }
                            const year = value.year();
                            const options = [];
                            for (let i = year - 10; i < year + 10; i += 1) {
                              options.push(
                                <Select.Option key={i} value={i} className="year-item">
                                  {i}
                                </Select.Option>,
                              );
                            }
                            return (
                              <ButtonContainer>
                                <Sel
                                  id="month"
                                  placeholder="Выберите месяц"
                                  onInput={this.handleSelect}
                                  value={valueSelect}
                                  options={MonthNames}
                                  clearable={false}
                                />
                                <BlockYear className="flex items-center p-l-15 p-r-20 justify-between">
                                  <div className="fw-700">
                                    {year}
                                  </div>
                                  <div className="flex">
                                    <div
                                      className="p-r-4 cursor"
                                      onClick={() => this.editYear("plus")}
                                      dangerouslySetInnerHTML={{__html: arrowUp}}
                                    />
                                    <div
                                      className="cursor"
                                      onClick={() => this.editYear("minus")}
                                      dangerouslySetInnerHTML={{__html: arrowDown}}
                                    />
                                  </div>
                                </BlockYear>
                              </ButtonContainer>
                            );
                          }}
                          onSelect={this.onCalendarInput}
                        />
                        <button
                          type="button"
                          onClick={this.getToday}
                          className="ml-auto block m-t-10 m-r-16 p-b-8"
                        >
                          Today
                        </button>
                      </DatePickerCalendarContainer>
                    </OverlayMenu>
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
  onInput: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.string,
  dateFormat: PropTypes.string,
  styleWrapperCalendar: PropTypes.string,
  tipMaxSize: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  // todo сделать стили при disabled
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  inputRef: PropTypes.func,
  onBlur: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

DatePicker.defaultProps = {
  value: "",
  dateFormat: PRESENT_DATE_FORMAT,
  tipMaxSize: "310",
  placeholder: "DD.MM.YYYY",
  className: "",
  onFocus: () => null,
  inputRef: () => null,
  onBlur: () => null,
}
export default withDatePickerHoc(DatePicker)
