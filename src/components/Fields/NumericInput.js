import React, { useMemo } from "react"
import PropTypes from "prop-types"
import BsInput from "./Input"
import compose from "lodash/fp/compose"

const NumericInput = ({ onlyInt, value, onInput, onBlur, id, ...props }) => {
  const pattern = useMemo(() => onlyInt ? /^([0-9]\d*|)/ : /^([0-9]\d*|)(\.(\d+|))?$/, [onlyInt])

  const inputMiddleware = (nextValue, id) => {
    compose(
      (v) => onInput(v, id),
      (v) => String(v).endsWith(".") ? v : Number(!String(v).startsWith(".") ? v : `0${v}`),
      (v) => v ? pattern.test(v) ? v.match(pattern)[0] : value : "",
      (v) => v.replace(",", ".")
    )(nextValue)
  }

  const blurMiddleware = () => {
    if (!pattern.test(value)) {
      onInput(undefined, id)
    }
    onBlur()
  }

  return (
    <BsInput
      {...props}
      value={value}
      id={id}
      onInput={inputMiddleware}
      onBlur={blurMiddleware}
    />
  )
}

NumericInput.propTypes = {
  onInput: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.any,
  onlyInt: PropTypes.bool,
}

NumericInput.defaultProps = {
  onBlur: () => null
}
export default NumericInput
