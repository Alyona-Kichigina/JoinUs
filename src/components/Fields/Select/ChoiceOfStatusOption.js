import React, {useState} from 'react';
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

const ChoiceOfStatusOption = ({onSelect}) => {
  const [value, setValue] = useState(false)
  const onInput = (v) => {
console.log(v,5454)
  }
  return (
    <OptionContainer
      className=" flex flex-col"
    >
      {arrayStatus.map(({label, icon, id}) => (
        <StyleCheckbox
          key={id}
          label={label}
          id={id}
          value={value}
          onInput={onInput}
          iconLabel={icon}
        />
      ))}

    </OptionContainer>
  );
};

ChoiceOfStatusOption.propTypes = {
  onSelect: PropTypes.func.isRequired,
}

export default ChoiceOfStatusOption;
