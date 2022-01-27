import React from "react"
import { SHORT_DATE_FORMAT } from "@/constants"
import BsDateProgressBar from "./index"

export default {
  title: "Components/ProgressBars/BsDateProgressBar",
  component: BsDateProgressBar,
  argTypes: {
    creationDate: {
      control: "text",
      description: `Дата начала отсчёта принимает дату в формате ${SHORT_DATE_FORMAT}`
    },
    deadlineDate: {
      control: "text",
      description: `Дата дедлайна принимает дату в формате ${SHORT_DATE_FORMAT}`
    }
  }
}

const Template = (args) => <BsDateProgressBar {...args} />

export const Default = Template.bind({})
Default.args = {
  creationDate: "01.01.2021",
  deadlineDate: "31.12.2021"
}
