import React, { useMemo } from "react"

const resolveValidationState = (validationErrors = [], validationAlerts = [],
  submitFailed, changed, touched, formHasSubmitted) => ({
  hasError: (Array.isArray(validationErrors) ? validationErrors : Object.keys(validationErrors)).length > 0
    ? (submitFailed && !changed) || (touched && changed)
    : false,
  hasAlert: (Array.isArray(validationAlerts) ? validationAlerts : Object.keys(validationAlerts)).length > 0
      && ((formHasSubmitted && !changed) || (touched && changed))

})

const resolveRequiredState = (validationRules = "", formPayload = {}) => {
  let requiredRule
  if (typeof validationRules === "object") {
    requiredRule = Object.values(validationRules).some((rule) => rule.indexOf("required") > -1)
  } else {
    requiredRule = validationRules.split("|").find(rule => rule.match("required"))
    requiredRule = requiredRule ? requiredRule.split(":") : false
  }
  if (Array.isArray(requiredRule)) {
    const [rule, condition] = requiredRule
    switch (rule) {
      case "required_if":
        const [key, value] = condition.split(",")
        return `${formPayload[key]}` === value
      case "required":
        return true
      default:
        return false
    }
  } else {
    return requiredRule
  }
}

const withInputWrapper = (Component) => ({ validationRules, validationErrors, validationAlerts, formPayload, submitFailed, changed, touched, formHasSubmitted, ...props }) => {
  const { hasError, hasAlert } = useMemo(
    () => resolveValidationState(validationErrors, validationAlerts, submitFailed, changed, touched, formHasSubmitted),
    [validationErrors, validationAlerts, submitFailed, changed, touched, formHasSubmitted]
  )

  const isRequired = useMemo(() => resolveRequiredState(validationRules, formPayload), [formPayload, validationRules])

  return (
    <Component
      {...props}
      hasError={hasError}
      hasAlert={hasAlert}
      isRequired={isRequired}
      validationRules={validationRules}
      validationErrors={validationErrors}
      validationAlerts={validationAlerts}
      formPayload={formPayload}
      submitFailed={submitFailed}
      changed={changed}
      touched={touched}
      formHasSubmitted={formHasSubmitted}
    />
  )
}

withInputWrapper.propTypes = {

}
withInputWrapper.defaultProps = {
  validationErrors: [],
  validationAlerts: [],
  validationRules: "",
  formPayload: {}
}

export default withInputWrapper
