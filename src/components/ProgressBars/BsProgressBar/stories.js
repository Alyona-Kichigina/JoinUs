import React from "react"
import BsProgressBar from "./index"

export default {
  title: "Components/ProgressBars/BsProgressBar",
  component: BsProgressBar,
  argTypes: {
    percentage: {
      control: "text",
      description: ""
    },
    customStyles: {
      control: "text",
      description: "Стили"
    }
  }
}

const Template = (args) => <BsProgressBar {...args} />

export const Default = Template.bind({})
Default.args = {
  percentage: "0",
  customStyles: {
    background: "var(--color-light-gold-1)",
    width: "36%"
  }
}
