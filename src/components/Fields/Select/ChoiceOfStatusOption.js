import React, {useCallback, useMemo, useState} from 'react';
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

// todo кликаю на чекбокс
// данные отображаются в селекте
// открываю список чекбоксов
// выбранный чекбокс не активен


// todo в селекте отображаются повторно активные чекбоксы и чекбоксы которые не активны

const ChoiceOfStatusOption = ({option, option: {ID, SYS_NAME, icon}, valueKey, onSelect, selectedOptions}) => {
  const [value, setValue] = useState([])

  const onInput = useCallback((value, id) => {
    setValue(value)
    onSelect(option, value.some(v => v.ID === id))
    }, [option, setValue, onSelect])

  return (
    <OptionContainer className="flex flex-col">
      <StyleCheckbox
        key={ID}
        label={SYS_NAME}
        id={ID}
        value={value}
        onInput={onInput}
        iconLabel={icon}
        checkBoxValue={option}
        returnObjects
      />
    </OptionContainer>
  );
};

ChoiceOfStatusOption.propTypes = {
  onSelect: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired,
}

export default ChoiceOfStatusOption;
