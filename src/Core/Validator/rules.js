import dayjs from "dayjs"
import { PRESENT_DATE_FORMAT } from "@constants"

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

export default {
  bigDateThen: {
    resolver({ value, ruleArgs: [fieldKey], formPayload: { [fieldKey]: sameField } }) {
      return dayjs(value, PRESENT_DATE_FORMAT).valueOf() >= dayjs(sameField, PRESENT_DATE_FORMAT).valueOf()
    },
    message: "End date must bee bigger than start date"
  },
  lessDateThen: {
    resolver({ value, ruleArgs: [fieldKey], formPayload: { [fieldKey]: sameField } }) {
      return dayjs(value, PRESENT_DATE_FORMAT).valueOf() <= dayjs(sameField, PRESENT_DATE_FORMAT).valueOf()
    },
    message: "Start date must bee less than end date"
  },
  same: {
    resolver: ({ value, ruleArgs: [fieldKey], formPayload: { [fieldKey]: sameField } }) => value === sameField,
    message: ({ ruleArgs: [fieldKey] }) => `The field value and ${fieldKey} value must match.`
  },
  password: {
    resolver: ({ value }) => strongRegex.test(value),
    message: "The value of field is required."
  },
  required: {
    resolver: ({ value }) => {
      if (typeof value === "string") {
        return String(value).replace(/\s/g, "").length > 0
      }
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return !(value === undefined || value === null)
    },
    nullAble: true,
    message: "The value of field is required."
  }
}
