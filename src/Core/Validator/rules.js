const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

export default {
  password: {
    resolver: ({ value }) => strongRegex.test(value),
    message: "Значение поля является обязательным."
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
    message: "Значение поля является обязательным."
  }
}
