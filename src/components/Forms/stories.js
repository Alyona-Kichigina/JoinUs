import React from "react"

import DefaultInputWrapper from "@/Components/Forms/InputWrappers/DefaultInputWrapper"
import BsInput from "@/Components/Fields/BsInput"
import Form from "./index"

const fieldsForm = [
  {
    id: "FIRST_NAME",
    component: BsInput,
    label: "First name",
    placeholder: "Add first name",
    maxlength: "300",
  },
  {
    id: "LAST_NAME",
    component: BsInput,
    label: "Last name",
    placeholder: "Add last name",
    maxlength: "300",
  },
]

const rules = {
  FIRST_NAME: "required",
}

// todo дописать описание пропсов
export default {
  title: "Components/Form/Form",
  component: Form,
  argTypes: {
    value: {
      description: "Объект или массив",
    },
    style: {
      description: "пропс эквивалентый HTML аттрибуту",
    },
    className: {
      description: "пропс эквивалентый HTML аттрибуту",
    },
    onInput: {
      description: "HTML свойство обработчик события",
    },
    id: {
      description: "id компонента"
    },
    loading: {
      description: "Индикатор загрузки"
    },
    submitFailed: {
      description: ""
    },
    formHasSubmitted: {
      description: ""
    },
    inputWrapper: {
      description: "Стили обертки поля"
    },
    fields: {
      description: "Массив с полями формы"
    },
    inputWrapperClass: {
      description: "HTML-класс обертки поля"
    },
    suffix: {
      description: ""
    },
    rules: {
      description: "Объект с ключами полей обязательных для заполнения"
    },
    touched: {
      description: "Получаем айди поля, которого коснулись"
    },
    changed: {
      description: "Получаем айди поля, в котором делали изменения"
    },
    formContainer: {
      description: ""
    },
    validationAlerts: {
      description: ""
    },
    interceptors: {
      description: ""
    },
    validationErrors: {
      description: "Объект с ключами обязательных полей и их ошибок"
    },
    onFocus: {
      description: "HTML свойство обработчик события",
    },
    onBlur: {
      description: "HTML свойство обработчик события",
    },
    onChange: {
      description: "HTML свойство обработчик события",
    },
    onSubmit: {
      description: "HTML свойство обработчик события",
    },
    children: {
      description: "React children"
    },
    classNameInputWrapper: {
      description: "HTML-класс обертки инпута"
    },
    classNameChildren: {
      description: "HTML-класс children"
    },
  }
}

const Template = (args) => <Form {...args} fields={fieldsForm} rules={rules} />

export const Default = Template.bind({})
Default.args = {
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
