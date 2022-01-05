import React, {useCallback, useState} from 'react';
import PropTypes from "prop-types"
import styled from "styled-components"
import CheckBox from "@Components/Fields/CheckBox";
import {OptionContainer} from "./styles"

const StyleCheckbox = styled(CheckBox)`
  display: flex;
  justify-content: space-between;
  padding-bottom: 14px;
  &:last-child {
    padding-bottom: 0;
  }
`

const arrayStatus = [
  {
    ID: "statusEnd",
    label: "Завершена",
    icon: "/assets/icons/iconStatus/iconStatusEnd.svg"
  },
  {
    ID: "statusWait",
    label: "Ожидание",
    icon: "/assets/icons/iconStatus/iconStatusWait.svg"
  },
  {
    ID: "statusWork",
    label: "В процессе",
    icon: "/assets/icons/iconStatus/iconStatusWait.svg"
  }
]

const ChoiceOfStatusOption = ({onSelect}) => {
  const [value, setValue] = useState([])

  const onInput = useCallback((value, id) => {
      const checkedStatus = arrayStatus.reduce((acc, item) => {
        if (item.ID === id) {
          acc.push(item)
        }
        return acc
      }, [...value])
      setValue(value ? checkedStatus.map(item => item) : [])
      onSelect(value ? checkedStatus.map(item => item) : [])
    }, [value, setValue])
  return (
    <OptionContainer
      className=" flex flex-col"
    >
      {arrayStatus.map(item => {
        const { ID, label, icon} = item
        return (
          <StyleCheckbox
            key={ID}
            label={label}
            id={ID}
            value={value}
            onInput={onInput}
            iconLabel={icon}
            checkBoxValue={item}
            returnObjects
          />
        )
      })}
    </OptionContainer>
  );
};

ChoiceOfStatusOption.propTypes = {
  onSelect: PropTypes.func.isRequired,
}

export default ChoiceOfStatusOption;
