import React from "react"

import PriceInput from "./index"

export default {
  title: "Components/Fields/PriceInput",
  component: PriceInput,
  argTypes: {
    value: {
      description: "Строка или число",
    },
    id: {
      description: "id компонента"
    },
    onInput: {
      description: "HTML свойство обработчик события",
    },
    inputRef: {
      description: "HTML элемент",
    },
  }
}

const Template = (args) => <PriceInput {...args} />

export const Default = Template.bind({})
Default.args = {
  inputRef: () => null,
  value: 111
}
