import React, { useCallback, useState, useRef, useEffect } from "react"
import debounce from "lodash/debounce"
import Input from "@Components/Fields/Input"
import Select from "../../../../components/Fields/Select";
import {FilterContainer} from "./style"

const options = [{ID: 1, SYS_NAME: "aaa"}]

const FilterForEmployees = () => {
  const [toggle, updateToggle] = useState(false)
  const [searchState, setSearchState] = useState("")
  const [valueSelect, setValueSelect] = useState({})
  const toggleSearch = useCallback(debounce(() => updateToggle(!toggle), 150), [toggle, updateToggle])
  const handleInput = useCallback((value) => {
    setSearchState(value)
  }, [])
  const onFocus = () => {

  }
  const handleSelect = useCallback((value) => {
    setValueSelect(value)
  }, [])
  return (
    <FilterContainer className="flex">
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
    </FilterContainer>
  );
};

export default FilterForEmployees;
