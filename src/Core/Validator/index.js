import { set } from "@Utils/Objects/ObjectPath"
import memoize from "lodash/memoize"
import rules from "./rules"

export default class Validator {
  mergeValidators = memoize((rules) => ({ ...Validator.defaultRules, ...rules }))

  parseRule = memoize((rulesObjs) => Object.entries(rulesObjs).map(([path, ruleString]) => {
    const rules = ruleString.split("|")
    return [path.split("."), rules.map(r => {
      const [ruleName, ruleArgs] = r.split(":")
      return [ruleName, ruleArgs ? ruleArgs.split(",") : ruleArgs]
    })]
  }))

  static defaultRules = rules

  validateInput = (validators) => {
    const validate = (input, path, ruleMeta, errors) => {
      let prevTempValue = input
      let tempValue = input

      for (let pathIndex = 0; pathIndex < path.length; pathIndex++) {
        const key = path[pathIndex]
        if (key === "*") {
          const nextErrors = {}
          const restPath = path.slice(pathIndex + 1)
          // eslint-disable-next-line no-loop-func
          if (tempValue) {
            tempValue.forEach((elem, index) => {
              validate(tempValue, [index, ...restPath], ruleMeta, nextErrors)
            })
          }
          if (Object.keys(nextErrors).length > 0) {
            console.log(path.slice(0, pathIndex), errors, nextErrors)
            set(path.slice(0, pathIndex), errors, nextErrors)
          }
          return errors
        }
        prevTempValue = tempValue
        tempValue = tempValue ? tempValue[key] : tempValue
      }
      const fieldErrors = ruleMeta.reduce((fieldErrors, [ruleName, ruleArgs]) => {
        const { resolver, message, nullAble } = validators[ruleName]
        if (tempValue || nullAble) {
          const resolverArgs = { value: tempValue, ruleArgs, formPayload: prevTempValue, totalValue: input, path, validators }
          if (!resolver(resolverArgs)) {
            fieldErrors.push(typeof message === "function" ? message(resolverArgs) : message)
          }
        }
        return fieldErrors
      }, [])
      if (fieldErrors.length > 0) {
        console.log(path, errors, fieldErrors)
        set(path, errors, fieldErrors)
      }
      return errors
    }
    return validate
  }

  validate = (input, rules, validators) => {
    const errors = {}
    const validator = this.validateInput(this.mergeValidators(validators))
    this.parseRule(rules).forEach((fieldRule) => {
      validator(input, ...fieldRule, errors)
    })
    return errors
  }
}
