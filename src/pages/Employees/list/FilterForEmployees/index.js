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
          dateFormat={PRESENT_DATE_FORMAT}
          onInput={onInputDatePicker}
          id="calendar"
          placeholder="Дата выхода"
          value={dateValue}
        />
      </div>

    </FilterContainer>
  );
};

export default FilterForEmployees;
