import { useMemo } from "react"
import PropTypes from "prop-types"

const resolveValidationState = (validationErrors = [], validationAlerts = [], submitFailed, changed,
  touched, formHasSubmitted) => ({
  hasError: (Array.isArray(validationErrors) ? validationErrors : Object.keys(validationErrors)).length > 0
    ? submitFailed || (touched && changed)
    : false,
  hasAlert: (Array.isArray(validationAlerts) ? validationAlerts : Object.keys(validationAlerts)).length > 0
      && (formHasSubmitted || (touched && changed))

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
      case "required_if": {
        const [key, value] = condition.split(",")
        return `${formPayload[key]}` === value
      }
      case "required":
        return true
      default:
        return false
    }
  } else {
    return requiredRule
  }
}

export default (validationErrors, validationAlerts, submitFailed, changed, touched, formHasSubmitted, validationRules, formPayload) => {
  const { hasError, hasAlert } = useMemo(
    () => resolveValidationState(validationErrors, validationAlerts, submitFailed, changed, touched, formHasSubmitted),
    [changed, formHasSubmitted, submitFailed, touched, validationAlerts, validationErrors]
  )

  const isRequired = useMemo(() => resolveRequiredState(validationRules, formPayload), [validationRules, formPayload])

  return { hasError, hasAlert, isRequired }
}

export const pTypes = {
  submitFailed: PropTypes.bool,
  formHasSubmitted: PropTypes.bool,
  touched: PropTypes.bool,
  changed: PropTypes.bool,
  validationErrors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  validationAlerts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  formPayload: PropTypes.object,
  validationRules: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}

export const dProps = {
  validationErrors: [],
  validationAlerts: [],
  validationRules: "",
  formPayload: {}
}
