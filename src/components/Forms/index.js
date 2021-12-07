import React, { useCallback, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import throttleAccumulator from "@Utils/FunctionsCall/throttleAccumulator"
import { FormContainerContext } from "@constants"
import DefaultInputWrapper from "./InputWrappers/DefaultInputWrapper"
import { ChildrenContainer } from "./styles"

const Form = ({
  onSubmit, children, id,
  formContainer: FormContainer, inputWrapperClass, fields, value, rules, onInput, suffix, touched, onChange,
  changed, validationErrors, submitFailed, formHasSubmitted, inputWrapper, onFocus, onBlur, interceptors,
  style, className, classNameInputWrapper,
  classNameChildren
}) => {
  const valueRef = useRef(value)
  const prevValueRef = useRef(value)
  const refFormContainer = useRef()
  prevValueRef.current = valueRef.current
  valueRef.current = value

  const handleInput = useCallback(throttleAccumulator((...args) => {
    onInput(args.reduce((acc, [value, id]) => {
      if (value === undefined) {
        delete acc[id]
      } else {
        acc[id] = value
      }
      return acc
    },
    { ...valueRef.current }))
    onChange()
  }, 10), [onChange, onInput])

  useEffect(() => {
    for (const [key, handler] of interceptors) {
      if (value[key] !== valueRef.current[key]) {
        valueRef.current[key] = value
        handler({ value: value[key], prevValue: valueRef.current[key], handleInput, formPayload: value })
      }
    }
  }, [handleInput, interceptors, value])

  const handleSubmit = useCallback((e) => {
    if (e.preventDefault) {
      e.preventDefault()
      e.stopPropagation()
    }
    return onSubmit(valueRef.current)
  }, [onSubmit])
  // todo избавиться от style

  return (
    <FormContainerContext.Provider value={refFormContainer.current}>
      <FormContainer
        className={`formContainer ${className}`}
        onSubmit={handleSubmit}
        id={id}
        ref={refFormContainer}
        style={style}
      >
        {fields.map(({ style, component: InputField, id, label, inputWrapper: IWrapper = inputWrapper, ...field }) => (
          <IWrapper
            {...field}
            key={id}
            style={style}
            className={inputWrapperClass}
            classNameInputWrapper={classNameInputWrapper}
            id={id}
            suffix={suffix}
            validationRules={rules[id]}
            validationErrors={validationErrors[id]}
            touched={touched[id]}
            changed={changed[id]}
            submitFailed={submitFailed}
            formHasSubmitted={formHasSubmitted}
            formPayload={value}
            label={label}
          >
            <InputField
              id={id}
              label={label}
              value={value[id]}
              formPayload={value}
              onInput={handleInput}
              onFocus={onFocus(id)}
              onBlur={onBlur(id)}
              validationErrors={validationErrors[id]}
              touched={touched[id]}
              changed={changed[id]}
              submitFailed={submitFailed}
              formHasSubmitted={formHasSubmitted}
              {...field}
            />
          </IWrapper>
        ))}
        {children && (
        <ChildrenContainer className={`${classNameChildren} flex-container`}>
          {children}
        </ChildrenContainer>
        )}
      </FormContainer>
    </FormContainerContext.Provider>
  )
}

Form.propTypes = {
  onInput: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
  submitFailed: PropTypes.bool,
  formHasSubmitted: PropTypes.bool,
  inputWrapper: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  fields: PropTypes.array,
  inputWrapperClass: PropTypes.string,
  suffix: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rules: PropTypes.object,
  touched: PropTypes.object,
  changed: PropTypes.object,
  formContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
  validationAlerts: PropTypes.object,
  interceptors: PropTypes.instanceOf(Map),
  validationErrors: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  style: PropTypes.object,
  classNameInputWrapper: PropTypes.string,
  classNameChildren: PropTypes.string,
}
Form.defaultProps = {
  inputWrapper: DefaultInputWrapper,
  formContainer: "form",
  className: "",
  classNameChildren: "",
  validationErrors: {},
  fields: [],
  validationAlerts: {},
  interceptors: new Map(),
  touched: {},
  changed: {},
  value: {},
  rules: {},
  onInput: () => null,
  onChange: () => null,
  onFocus: () => () => null,
  onBlur: () => () => null,
}

export default Form
