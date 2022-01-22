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

const ChoiceOfStatusOption = ({option, option: {ID, SYS_NAME, icon}, valueKey, onSelect, selectedOptions}) => {

  const onInput = useCallback((value, id) => {
    onSelect(option, selectedOptions.some(v => v.ID === id), selectedOptions.findIndex(v => v.ID === id))
    }, [option, onSelect, selectedOptions])

  return (
    <OptionContainer className="flex flex-col">
      <StyleCheckbox
        key={ID}
        label={SYS_NAME}
        id={ID}
        valueKey={valueKey}
        value={selectedOptions}
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
