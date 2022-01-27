import React, { useCallback, useState, useRef, useEffect } from "react"
import Input from "@Components/Fields/Input"
import Select from "../../../../components/Fields/Select";
import {FilterContainer} from "./style"
import DatePicker from "../../../../components/Fields/DatePicker";
import ChoiceOfStatusOption from "../../../../components/Fields/Select/ChoiceOfStatusOption";

const arrayStatus = [
  {
    ID: "statusEnd",
    SYS_NAME: "Завершена",
    icon: "/assets/icons/iconStatus/iconStatusEnd.svg"
  },
  {
    ID: "statusWait",
    SYS_NAME: "Ожидание",
    icon: "/assets/icons/iconStatus/iconStatusWait.svg"
  },
  {
    ID: "statusWork",
    SYS_NAME: "В процессе",
    icon: "/assets/icons/iconStatus/iconStatusWorking.svg"
  }
]

const FilterForEmployees = ({handleInput}) => {
  const [dataForInput, setDataForInput] = useState("")
  const [valueSelect, setValueSelect] = useState([])
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const onInput = useCallback((value, id) => {
    setDataForInput(value)
    handleInput(value, id)
  }, [setDataForInput])

  const handleSelect = useCallback((value, id) => {
    setValueSelect(value)
    handleInput(value, id)
  }, [setValueSelect])

  const onInputDateFrom = useCallback((value, id) => {
      setDateFrom(value)
      handleInput(value, id)
    }, [setDateFrom])

  const onInputDateTo = useCallback((value, id) => {
    setDateTo(value)
    handleInput(value, id)
  }, [setDateTo])

  return (
    <FilterContainer className="m-b-16">
      <div className="">
        <div className="fs-12 color-light-blue-2 p-b-5">ФИО/Должность</div>
        <Input
          id="name"
          placeholder="Введите ФИО или должность"
          value={dataForInput}
          onInput={onInput}
        />
      </div>
      <div className="">
        <div className="fs-12 color-light-blue-2 p-b-5">Статус</div>
        <Select
          ComponentOption={ChoiceOfStatusOption}
          id="status"
          placeholder="Выберите статус"
          onInput={handleSelect}
          value={valueSelect}
          options={arrayStatus}
          multiple
          returnOption
        />
      </div>
      <div className="flex m-l-a">
        <div
          className="fs-12 color-light-blue-2 p-r-16 p-b-14 flex items-end"
        >
          Дата выхода
        </div>
        <div className="p-r-8 flex-auto">
          <div className="fs-12 color-light-blue-2 p-b-5">От</div>
          <DatePicker
            onInput={onInputDateFrom}
            id="release_date"
            placeholder="От"
            value={dateFrom}
            style={{width: "160px"}}
          />
        </div>
        <div className="flex-auto">
          <div className="fs-12 color-light-blue-2 p-b-5">До</div>
          <DatePicker
            onInput={onInputDateTo}
            id="create_date"
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
