import React, { useCallback, useState, useRef, useEffect } from "react"
import debounce from "lodash/debounce"
import Input from "@Components/Fields/Input"
// import Select from "../../../../components/Fields/Select";
import {FilterContainer} from "./style"
import CheckBox from "@Components/Fields/CheckBox";
// import { Calendar, Select, Col, Row } from 'antd';
import DatePicker from "../../../../components/Fields/Calendar";
import {PRESENT_DATE_FORMAT} from "@constants"

const options = [{ID: 1, SYS_NAME: "aaa"}]

// const { Option } = Select;

const arrayStatus = [
  {
    id: "statusEnd",
    label: "Завершена",
    icon: "/assets/icons/iconStatus/iconStatusEnd.svg"
  },
  {
    id: "statusWait",
    label: "Ожидание",
    icon: "/assets/icons/iconStatus/iconStatusWait.svg"
  },
  {
    id: "statusWork",
    label: "В процессе",
    icon: "/assets/icons/iconStatus/iconStatusWait.svg"
  }
]

const FilterForEmployees = () => {
  const [toggle, updateToggle] = useState(false)
  const [searchState, setSearchState] = useState("")
  const [valueSelect, setValueSelect] = useState({})
  const [value, setValue] = useState(false)
  const[date, setDate] = useState({DATE: []})
  const[dateValue, setDateValue] = useState([])

  const toggleSearch = useCallback(debounce(() => updateToggle(!toggle), 150), [toggle, updateToggle])
  const handleInput = useCallback((value) => {
    setSearchState(value)
  }, [])
  const onFocus = () => {

  }
  const handleSelect = useCallback((value) => {
    setValueSelect(value)
  }, [])

  const onInputCha = (value) => {
    setValue(value)
  }

  const onInputDatePicker = (value) => {
    setDateValue([value])
  }
  return (
    <FilterContainer className="flex m-b-16">
      <div>
        <div className="fs-12 color-light-blue-2 p-b-5">ФИО/Должность</div>
        <Input
          id="name"
          placeholder="Введите ФИО или должность"
          value={searchState}
          onBlur={toggleSearch}
          onInput={handleInput}
          onFocus={onFocus}
        />
      </div>
      <div>
        <div className="fs-12 color-light-blue-2 p-b-5">Статус</div>
        {/*<Select*/}
        {/*  id="status"*/}
        {/*  placeholder="Выберите статус"*/}
        {/*  onInput={handleSelect}*/}
        {/*  value={valueSelect}*/}
        {/*  onFocus={onFocus}*/}
        {/*  onBlur={toggleSearch}*/}
        {/*  options={options}*/}
        {/*  clearable={false}*/}
        {/*/>*/}
      </div>
      {arrayStatus.map(({label, icon, id}) => (
        <CheckBox
          key={id}
          label={label}
          id={id}
          value={value}
          onInput={onInputCha}
          iconLabel={icon}
          className="p-b-18"
        />
      ))}
      <div className="flex-auto">
        <DatePicker
          formPayload={date}
          dateFormat={PRESENT_DATE_FORMAT}
          onInput={onInputDatePicker}
          id="calendar"
          placeholder="dfgsdfsd"
          value={dateValue}
        />
      </div>

      {/*<div className="site-calendar-customize-header-wrapper">*/}
      {/*  <Calendar*/}
      {/*    fullscreen={false}*/}
      {/*    headerRender={({ value, type, onChange, onTypeChange }) => {*/}
      {/*      const start = 0;*/}
      {/*      const end = 12;*/}
      {/*      const monthOptions = [];*/}

      {/*      const current = value.clone();*/}
      {/*      const localeData = value.localeData();*/}
      {/*      const months = [];*/}
      {/*      for (let i = 0; i < 12; i++) {*/}
      {/*        current.month(i);*/}
      {/*        months.push(localeData.monthsShort(current));*/}
      {/*      }*/}

      {/*      for (let index = start; index < end; index++) {*/}
      {/*        monthOptions.push(*/}
      {/*          <Select.Option className="month-item" key={`${index}`}>*/}
      {/*            {months[index]}*/}
      {/*          </Select.Option>,*/}
      {/*        );*/}
      {/*      }*/}
      {/*      const month = value.month();*/}

      {/*      const year = value.year();*/}
      {/*      const options = [];*/}
      {/*      for (let i = year - 10; i < year + 10; i += 1) {*/}
      {/*        options.push(*/}
      {/*          <Select.Option key={i} value={i} className="year-item">*/}
      {/*            {i}*/}
      {/*          </Select.Option>,*/}
      {/*        );*/}
      {/*      }*/}
      {/*      return (*/}
      {/*        <div style={{ padding: 8 }}>*/}
      {/*          <Row gutter={8}>*/}
      {/*            <Col>*/}
      {/*              <Select*/}
      {/*                size="small"*/}
      {/*                dropdownMatchSelectWidth={false}*/}
      {/*                value={String(month)}*/}
      {/*                onChange={selectedMonth => {*/}
      {/*                  const newValue = value.clone();*/}
      {/*                  newValue.month(parseInt(selectedMonth, 10));*/}
      {/*                  onChange(newValue);*/}
      {/*                }}*/}
      {/*              >*/}
      {/*                {monthOptions}*/}
      {/*              </Select>*/}
      {/*            </Col>*/}
      {/*            <Col>*/}
      {/*              <Select*/}
      {/*                size="small"*/}
      {/*                dropdownMatchSelectWidth={false}*/}
      {/*                className="my-year-select"*/}
      {/*                onChange={newYear => {*/}
      {/*                  const now = value.clone().year(newYear);*/}
      {/*                  onChange(now);*/}
      {/*                }}*/}
      {/*                value={String(year)}*/}
      {/*              >*/}
      {/*                {options}*/}
      {/*              </Select>*/}
      {/*            </Col>*/}
      {/*          </Row>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    }}*/}
      {/*    onChange={onPanelChange}*/}
      {/*  />*/}
      {/*</div>*/}

    </FilterContainer>
  );
};

export default FilterForEmployees;
