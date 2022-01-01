import React from "react"
import PropTypes from "prop-types"
import useValidation, { pTypes, dProps } from "@Components/Forms/InputWrappers/useValidation"
import { InputWrapperContainer, InputLabel, InputContainer, InputErrorContainer } from "./styles"

export { InputWrapperContainer, InputLabel, InputContainer, InputErrorContainer }

const DefaultInputWrapper = React.forwardRef(({
  className, style, withoutLabel, id, label, suffix, validationErrors, children,
  validationAlerts, submitFailed, changed, touched, formHasSubmitted, validationRules, formPayload, slotLabel,
  classNameInputWrapper
}, ref) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { hasError, isRequired } = useValidation(
    validationErrors, validationAlerts, submitFailed, changed, touched, formHasSubmitted, validationRules, formPayload
  )
  return (
    <InputWrapperContainer className={`${className} flex flex-col flex-auto`} style={style} ref={ref}>
      {!withoutLabel && (
      <InputLabel htmlFor={id}>
        { label } {isRequired && <span>*</span>}{ suffix }
        {slotLabel}
      </InputLabel>
      )}
      <InputContainer
        className={`${classNameInputWrapper} flex-auto`}
        hasError={hasError}
      >
        {children}
        {hasError && (
        <InputErrorContainer>
          {validationErrors[0]}
        </InputErrorContainer>
        )}
      </InputContainer>
    </InputWrapperContainer>
  )
})

DefaultInputWrapper.propTypes = {
  ...pTypes,
  withoutLabel: PropTypes.bool,
  suffix: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  style: PropTypes.object,
}

DefaultInputWrapper.defaultProps = {
  ...dProps,
  className: "",
}

export default DefaultInputWrapper
