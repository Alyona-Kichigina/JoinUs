import React, { useCallback, useState, useRef, useEffect } from "react"
import Input from "@Components/Fields/Input"
import Select from "../../../../components/Fields/Select";
import {FilterContainer} from "./style"

import DatePicker from "../../../../components/Fields/DatePicker";
import {PRESENT_DATE_FORMAT} from "@constants"
import ChoiceOfStatusOption from "../../../../components/Fields/Select/ChoiceOfStatusOption";

const options = [
  {ID: 1, SYS_NAME: "aaa"},{ID: 1, SYS_NAME: "aaa"},{ID: 1, SYS_NAME: "aaa"},{ID: 1, SYS_NAME: "aaa"},{ID: 1, SYS_NAME: "aaa"},{ID: 1, SYS_NAME: "aaa"},
  {ID: 1, SYS_NAME: "aaa"},{ID: 1, SYS_NAME: "aaa"},{ID: 1, SYS_NAME: "aaa"},{ID: 1, SYS_NAME: "aaa"},{ID: 1, SYS_NAME: "aaa"},{ID: 1, SYS_NAME: "aaa"},
]

const FilterForEmployees = ({handleInput}) => {
  const [dataForInput, setDataForInput] = useState("")
  const [valueSelect, setValueSelect] = useState({})
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const onInput = useCallback((value, id) => {
    setDataForInput(value)
    handleInput(value, id)
  }, [setDataForInput, handleInput])

  const handleSelect = useCallback((value) => {
    setValueSelect(value)
  }, [])

  const onInputDateFrom = useCallback((value, id) => {
      setDateFrom(value)
      handleInput(value, id)
    }, [handleInput])

  const onInputDateTo = useCallback((value, id) => {
    setDateTo(value)
    handleInput(value, id)
  }, [handleInput])

  const selectOption = useCallback((value) => {
    // console.log(value)
  }, [])

  return (
    <FilterContainer className="m-b-16">
      <div className="p-r-24">
        <div className="fs-12 color-light-blue-2 p-b-5">ФИО/Должность</div>
        <Input
          id="name"
          placeholder="Введите ФИО или должность"
          value={dataForInput}
          onInput={onInput}
        />
      </div>
      <ChoiceOfStatusOption
        onSelect={selectOption}
      />
      <div className="p-r-24">
        <div className="fs-12 color-light-blue-2 p-b-5">Статус</div>
        <Select
          id="status"
          placeholder="Выберите статус"
          onInput={handleSelect}
          value={valueSelect}
          options={options}
          clearable={false}
          mult
          choiceStatus
        />
      </div>
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
            onInput={onInputDateFrom}
            id="dateFrom"
            placeholder="От"
            value={dateFrom}
            style={{width: "160px"}}
          />
        </div>
        <div className="flex-auto">
          <div className="fs-12 color-light-blue-2 p-b-5">До</div>
          <DatePicker
            dateFormat={PRESENT_DATE_FORMAT}
            onInput={onInputDateTo}
            id="dateTo"
            placeholder="До"
            value={dateTo}
            style={{width: "160px"}}
          />
        </div>
      </div>

    </FilterContainer>
  );
};

export default FilterForEmployees;
