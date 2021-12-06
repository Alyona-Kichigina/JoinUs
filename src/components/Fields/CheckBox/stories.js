import React from "react"

import BsCheckBox from "./index"

export default {
  title: "Components/Fields/CheckBox",
  component: BsCheckBox,
  argTypes: {
    value: {
      description: "Масссив с объектом",
    },
    checkBoxLabel: {
      description: "Заголовок компонента"
    },
    label: {
      description: "Заголовок компонента"
    },
    returnObjects: {
      description: "Возвращать объект"
    },
    disabled: {
      description: "HTML блокировка"
    },
    onBlur: {
      description: "HTML свойство обработчик события"
    },
    onFocus: {
      description: "HTML свойство обработчик события"
    },
    reverseMode: {
      description: "По умолчанию чекбокс активный"
    },
    checkBoxValue: {
      description: "Объект с данными чекбокса"
    },
    valueKey: {
      description: "Ключ значения, если checkBoxValue объект"
    },
    onInput: {
      description: "HTML свойство обработчик события"
    },
    id: {
      description: "id компонента"
    },
    style: {
      description: "пропс эквивалентый HTML аттрибуту",
    },
    className: {
      description: "пропс эквивалентый HTML аттрибуту",
    },
  }
}

const Template = (args) => (
  <div className="display-flex fd-column j-c-start">
    <div className="p-b-10"><BsCheckBox {...args} label="Label" id="CheckBox" /></div>
    <div className="p-b-10"><BsCheckBox {...args} label="Label" id="CheckBox2" reverseMode /></div>
    <div className="p-b-10"><BsCheckBox {...args} label="Label" id="CheckBox3" reverseMode disabled /></div>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  valueKey: "ID",
  onBlur: () => null,
  onFocus: () => null,
}
