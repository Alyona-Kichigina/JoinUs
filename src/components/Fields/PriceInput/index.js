import React, { useCallback, useEffect, useMemo, useRef } from "react"
import PropTypes from "prop-types"
import { useWatch } from "@Utils/hooks/useWatch"
import Input from "@Components/Fields/Input"
import {StyleIcon} from "./style"

// нужно чтобы PriceInput отдавал данные как число

function setGaps(value) {
  let dif = value.length % 3
  dif = dif === 0 ? 2 : dif - 1
  return value
    .split("")
    .reduce((previousValue, currentValue, index) => `${previousValue}${currentValue}${index % 3 === dif ? " " : ""}`, "")
    .trim()
}

export function priceMask(value = "") {
  if (!value && value !== 0) return ""
  const [ceil, double] = String(value).split(".")
  if (String(value).endsWith(".")) return `${setGaps(ceil)}.`
  return double ? `${setGaps(ceil)}.${double}` : setGaps(ceil)
}
export const unmaskPriceInput = value => value
  .replace(",", ".")
  .replace(/\..*/, c => `.${c.replace(/\./g, () => "")}`)
  .replace(/(^\.|[^0-9.]+$)/, "")
  .replace(/\s/gi, "")

export function renderPrice(value) {
  return priceMask(Number(Number(value).toFixed(4)))
}

const PriceInput = ({ value, id, onInput, inputRef, ...props }) => {
  const input = useRef(null)
  // console.log(inputRef)

  const normalizedValue = useMemo(() => priceMask(value), [value])
  const handleInput = useCallback((nextValue, id) => {
    const unmaskValue = unmaskPriceInput(nextValue)

    if (unmaskValue !== value) {
      onInput(unmaskValue, id)
    } else {
      const selection = input.current.selectionStart
      setTimeout(() => {
        input.current.setSelectionRange(selection - 1, selection - 1)
      }, 10)
    }
  }, [onInput, value])

  const setInputRef = useCallback((id, ref) => {
    input.current = ref
  }, [])

  useEffect(() => {
    inputRef(id, input.current)
    return () => {
      inputRef(id)
    }
  }, [id, inputRef])

  useWatch(normalizedValue, (newVal, prevValue = "") => {
    if (newVal !== prevValue) {
      let selection = Number(input.current.selectionStart)
      const diff = newVal.length > prevValue.length ? 1 : -1
      for (let i = 0; i < newVal.length; i++) {
        if (newVal[i] !== prevValue[i]) {
          if (newVal[i] === " ") {
            selection += (i < selection ? diff : -diff)
          }
          break
        }
      }
      setTimeout(() => {
        input.current?.setSelectionRange(selection, selection)
      }, 10)
    }
  })

  return (
    <Input
      {...props}
      inputRef={setInputRef}
      onInput={handleInput}
      value={normalizedValue}
      id={id}
    >
      <StyleIcon>RUB</StyleIcon>
    </Input>
  )
}

PriceInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onInput: PropTypes.func.isRequired,
  inputRef: PropTypes.func,
}
PriceInput.defaultProps = {
  inputRef: () => null
}

export default PriceInput
