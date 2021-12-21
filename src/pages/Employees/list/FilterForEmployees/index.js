import React, { useCallback, useState, useRef, useEffect } from "react"
import debounce from "lodash/debounce"
import Input from "@Components/Fields/Input"
import Select from "../../../../components/Fields/Select";
import {FilterContainer} from "./style"
import CheckBox from "@Components/Fields/CheckBox";
import DatePicker from "../../../../components/Fields/DatePicker";
import {PRESENT_DATE_FORMAT} from "@constants"

const options = [{ID: 1, SYS_NAME: "aaa"}]


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
  const[dateValue, setDateValue] = useState("")

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
    setDateValue(value)
  }
  return (
    <FilterContainer className="m-b-16">
      <div className="p-r-24">
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
      <div className="p-r-24">
        <div className="fs-12 color-light-blue-2 p-b-5">Статус</div>
        <Select
          id="status"
          placeholder="Выберите статус"
          onInput={handleSelect}
          value={valueSelect}
          onFocus={onFocus}
          onBlur={toggleSearch}
          options={options}
          clearable={false}
        />
      </div>
      {/*{arrayStatus.map(({label, icon, id}) => (*/}
      {/*  <CheckBox*/}
      {/*    key={id}*/}
      {/*    label={label}*/}
      {/*    id={id}*/}
      {/*    value={value}*/}
      {/*    onInput={onInputCha}*/}
      {/*    iconLabel={icon}*/}
      {/*    className="p-b-18"*/}
      {/*  />*/}
      {/*))}*/}
      <div className="flex">
        <div
          className="fs-12 color-light-blue-2 p-r-16 p-b-14 flex items-end"
        >
          Дата выхода
        </div>
        <div className="p-r-8 flex-auto">
          <div className="fs-12 color-light-blue-2 p-b-5">От</div>
          <DatePicker
            dateFormat={PRESENT_DATE_FORMAT}
            onInput={onInputDatePicker}
            id="calendar"
            placeholder="От"
            value={dateValue}
            style={{width: "160px"}}
          />
        </div>
        <div className="flex-auto">
          <div className="fs-12 color-light-blue-2 p-b-5">До</div>
          <DatePicker
            dateFormat={PRESENT_DATE_FORMAT}
            onInput={onInputDatePicker}
            id="calendar"
            placeholder="До"
            value={dateValue}
            style={{width: "160px"}}
          />
        </div>
      </div>

    </FilterContainer>
  );
};

export default FilterForEmployees;
