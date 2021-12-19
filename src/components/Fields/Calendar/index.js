import React, {Component} from 'react';
import RenderOverlayMenu from "@Components/OverlayMenu/RenderOverlayMenu"
import WithCloseWindow from "@Core/RenderProps/withCloseWindow"
import {SuggestDataInput, DatePickerCalendarContainer} from "./styles";
import dayjs from "dayjs";
import padStart from "lodash/padStart";
import memoizeOne from "memoize-one";
import { ToggleIconContainer, ToggleIndicator } from "@Components/Fields/Select/styles"
import PropTypes from "prop-types";
import {PRESENT_DATE_FORMAT} from "@constants"
import { Calendar, Select, Col, Row } from 'antd';
import moment from "moment";

const { Option } = Select;

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

class DatePicker extends Component {

  constructor(props) {
    super(props)
    this.refSuggestInputContainer = React.createRef()
    this.refHiddenInput = React.createRef()
    this.state = {
      suggestData: undefined,
      open: false,
      suggestDataInputIndex: 0,
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

  emitSuggestData = () => {
    const {
      props: { id, value, dateFormat, onInput },
      state: { suggestData: [startDay, startMonth, startYear] }
    } = this
    const nextDate = dayjs(new Date(startYear, startMonth - 1, startDay)).format(dateFormat)
    if (value !== nextDate) {
      onInput(nextDate, id)
    }
    this.setState({ suggestData: undefined })
  }

  checkAndEmmitSuggestValue = () => {
    const { state: { suggestData }, } = this
    if (suggestData && suggestData.every((v) => !/\D/g.test(v))) {
      this.emitSuggestData()
    }
  }

  onInitialInput = ({ target: { value } }) => {
    this.setState({ suggestData: [value, "MM", "YYYY"]})
  }

  getSuggestInputByIndex = (index) => this.refSuggestInputContainer.current?.children[0].children[index].children[0].children[0]

  componentDidUpdate(prevProps, prevState) {
    const { state: { open } } = this
    if (open !== prevState.open) {
      const {
        props: { dateFormat, value, formPayload },
        state: { suggestData },
      } = this
      if (open) {
        if (!suggestData) {
          const dateUnWrapper = unwrapValue(dateFormat)
          const [
            startDay = "DD", startMonth = "MM", startYear = "YYYY", endDay = "DD", endMonth = "MM", endYear = "YYYY"
          ] = Array.isArray(value)
            ? value.map(dateUnWrapper).flat()
            : dateUnWrapper(value)
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({
            suggestData: [startDay, startMonth, startYear]
          })
        }
        // setTimeout(() => {
        //   this.getSuggestInputByIndex(0)?.focus()
        // }, 150)
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

  onCalendarInput = (value, id) => {
    const { props: { onInput, dateFormat } } = this
    console.log(value._d)
    onInput(dayjs(value._d).format(dateFormat), id)
    this.setState({ suggestData: undefined })
    this.closeCalendar()
  }

  render() {
    const {
      refSuggestInputContainer, refHiddenInput,
      props: {
        style, className, disabled, placeholder, children, tipMaxSize,
        value, dateFormat, disabledDatesTodayDate, formPayload
      },
      state: { suggestData, open }
    } = this
    // console.log(value)
    // console.log(moment([2011, 9, 31]))
    console.log(moment('2016-11-23').fromNow())
    // что такое normalizedDate
    // const normalizedDate = this.getInputValue(normalizedValue)
    // /*что такое suggestData*/
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
                    >
                      <input
                        type="text"
                        className="pointer-events-auto opacity-0 absolute"
                        onFocus={onOpenOverlayMenu}
                        style={{ height: "var(--height-input)" }}
                        onInput={this.onInitialInput}
                        ref={refHiddenInput}
                      />
                      <div
                        className="input-control flex h-full "
                        style={{ height: "var(--height-input)" }}
                      >
                        <div
                          className="relative flex-container"
                        >
                          {
                             value.length > 0
                              ? (
                                <div className="m-t-a m-b-a fs-14">
                                  {value}
                                </div>
                              )
                              : (
                                <div className="m-t-a m-b-a color-light-blue-2 fs-12">
                                  {placeholder}
                                </div>
                              )
                          }
                        </div>
                      </div>
                      {children}
                      <ToggleIconContainer
                        type="button"
                        onClick={open ? this.closeCalendar : this.openCalendar}
                      >
                        <ToggleIconContainer/>
                      </ToggleIconContainer>
                      </div>
                    <OverlayMenu
                      axis="y"
                      containerMargin="2px"
                      maxSize={tipMaxSize}
                      minSize="min-content"
                      onMouseDown={onMouseDown}
                      renderTip={false}
                    >
                      <DatePickerCalendarContainer
                      >
                          <Calendar
                            value={moment(new Date(2018, 8, 18))}
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
                              const month = value.month();

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
                                <div style={{ padding: 8 }}>
                                  <Row gutter={8}>
                                    <Col>
                                      <Select
                                        size="small"
                                        dropdownMatchSelectWidth={false}
                                        value={String(month)}
                                        onChange={selectedMonth => {
                                          const newValue = value.clone();
                                          newValue.month(parseInt(selectedMonth, 10));
                                          onChange(newValue);
                                        }}
                                      >
                                        {monthOptions}
                                      </Select>
                                    </Col>
                                    <Col>
                                      <Select
                                        size="small"
                                        dropdownMatchSelectWidth={false}
                                        className="my-year-select"
                                        onChange={newYear => {
                                          const now = value.clone().year(newYear);
                                          onChange(now);
                                        }}
                                        value={String(year)}
                                      >
                                        {options}
                                      </Select>
                                    </Col>
                                  </Row>
                                </div>
                              );
                            }}
                            onSelect={this.onCalendarInput}
                          />

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
  formPayload: PropTypes.object.isRequired,
  onInput: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  dateFormat: PropTypes.string,
  styleWrapperCalendar: PropTypes.string,
  tipMaxSize: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
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
  placeholder: "DD.MM.YYYY",
  className: "",
  onFocus: () => null,
  inputRef: () => null,
  onBlur: () => null,
}
export default DatePicker
