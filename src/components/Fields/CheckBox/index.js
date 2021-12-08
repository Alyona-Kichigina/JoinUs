import React, { useMemo, useCallback } from "react"
import PropTypes from "prop-types"
import { BoxContainer, CheckBox, CheckBoxContainer } from "./styles"

export { BoxContainer, CheckBox }

function resolveCheckboxValue(checkBoxValue, valueKey) {
  return checkBoxValue !== null && typeof checkBoxValue === "object" ? checkBoxValue[valueKey] : checkBoxValue
}

function handleArrayModel(normalizeCheckBoxVal, value = [], checked, valueKey, checkBoxValue, returnObjects, reverseMode) {
  return (!reverseMode && checked) || (reverseMode && !checked)
    ? value.filter(val => (typeof val === "object" ? val[valueKey] : val) !== normalizeCheckBoxVal)
    : [
      ...value,
      returnObjects
        ? typeof checkBoxValue === "object"
          ? checkBoxValue
          : { [valueKey]: normalizeCheckBoxVal }
        : normalizeCheckBoxVal
    ]
}

function emitCheckboxValue(id, onBlur, onFocus, onInput, normalizeCheckBoxVal, value, checked,
  valueKey, checkBoxValue, returnObjects, reverseMode) {
  onFocus()
  onInput(
    checkBoxValue
      ? handleArrayModel(normalizeCheckBoxVal, value, checked, valueKey, checkBoxValue, returnObjects, reverseMode)
      : !value,
    id,
    normalizeCheckBoxVal
  )
  onBlur()
}

const BsCheckBox = ({
  value, returnObjects, reverseMode, disabled, label, checkBoxLabel, checkBoxValue, valueKey,
  id, onBlur, onFocus, onInput, className, style, iconLabel
}) => {
  const normalizeCheckBoxVal = useMemo(
    () => resolveCheckboxValue(checkBoxValue, valueKey),
    [checkBoxValue, valueKey]
  )
  const checked = useMemo(
    () => reverseMode
      ? checkBoxValue && Array.isArray(value)
        ? value && value.every(val => (returnObjects ? val[valueKey] : val) !== normalizeCheckBoxVal)
        : !value
      : checkBoxValue && Array.isArray(value)
        ? value && value.some(val => (returnObjects ? val[valueKey] : val) === normalizeCheckBoxVal)
        : !!value,
    [checkBoxValue, value, valueKey, normalizeCheckBoxVal, returnObjects, reverseMode]
  )

  const  updateValue = useCallback(() => emitCheckboxValue(
    id, onBlur, onFocus, onInput, normalizeCheckBoxVal, value, checked, valueKey, checkBoxValue, returnObjects, reverseMode
  ),
  [id, onBlur, onFocus, onInput, normalizeCheckBoxVal, value, checked, valueKey, checkBoxValue, returnObjects, reverseMode])

  return (
    <CheckBoxContainer
      className={`${className} flex items-center`}
      style={style}
      disabled={disabled}
      type="button"
      onMouseDown={updateValue}
      name={checkBoxLabel || label}
    >
      {label && (
        <div className="flex items-center">
          {iconLabel && (
            <img src={iconLabel} alt="" className="p-r-8"/>
          )}
          <div
            className="p-r-15 fz14"
          >
            { checkBoxLabel || label }
          </div>
        </div>
      )}
      <BoxContainer checked={checked}>
        <CheckBox checked={checked}>
          {checked && (
            <img src="./assets/icons/checkbox.jpg" alt=""/>
          )}
        </CheckBox>
      </BoxContainer>
    </CheckBoxContainer>
  )
}

BsCheckBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.bool, PropTypes.object]),
  checkBoxLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  returnObjects: PropTypes.bool,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  reverseMode: PropTypes.bool,
  checkBoxValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  valueKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onInput: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconLabel: PropTypes.string,
}

BsCheckBox.defaultProps = {
  valueKey: "ID",
  onBlur: () => null,
  onFocus: () => null,
  className: "",
  style: {}
}

export default BsCheckBox
