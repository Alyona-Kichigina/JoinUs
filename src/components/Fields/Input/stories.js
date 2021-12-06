import React from "react"

import BsInput from "./index"

export default {
  title: "Components/Fields/Input",
  component: BsInput,
  argTypes: {
    value: {
      description: "Объект с ключом и именем файла",
    },
    type: {
      description: "HTML тэг компонента"
    },
    maxlength: {
      description: "Максимальное колличество символов в компоненте"
    },
    autosize: {
      description: ""
    },
    minHeight: {
      description: "Минимальная высота компонента"
    },
    maxHeight: {
      description: "Максимальная высота компонента"
    },
    placeholder: {
      description: "placeholder компонента"
    },
    disabled: {
      description: "HTML блокировка"
    },
    onKeyUp: {
      description: "HTML свойство обработчик события"
    },
    onBlur: {
      description: "HTML свойство обработчик события"
    },
    onFocus: {
      description: "HTML свойство обработчик события"
    },
    inputStyles: {
      description: "HTML свойство стиль"
    },
    children: {
      description: "React children"
    },
    inputRef: {
      description: "HTML элемент"
    },
    autoComplete: {
      description: "HTML свойство которое автозаполняет значения"
    },
    ShowInputFillIndicator: {
      description: "Показывать индикатор набора данных в поле ввода"
    },
    className: {
      description: "пропс эквивалентый HTML аттрибуту",
    },
  }
}

const Template = (args) => (
  <div className="display-flex fd-column j-c-start">
    <div className="p-b-10"><BsInput {...args} placeholder="type: input" /></div>
    <div className="p-b-10"><BsInput {...args} placeholder="type: input, disabled" disabled /></div>
    <div className="p-b-10"><BsInput {...args} placeholder="type: textarea" type="textarea" /></div>
    <div className="p-b-10"><BsInput {...args} placeholder="type: password" type="password" /></div>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  value: "",
  type: "input",
  autoComplete: "off",
  maxHeight: 350,
  placeholder: "",
  className: "",
  inputRef: () => null,
  styleInputBox: {},
  ShowInputFillIndicator: true
}
