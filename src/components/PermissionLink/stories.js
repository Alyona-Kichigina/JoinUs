import React from "react"
import PermissionLink from "./index"

export default {
  title: "Components/PermissionLink",
  component: PermissionLink,
  argTypes: {
    to: {
      description: "Путь",
    },
    name: {
      description: "",
    }
  }
}

const Template = (args) => (
  <PermissionLink
    className="color-lightGold fs-14 fw700"
    {...args}
  >
    {`${"dokdoqwk"}`}
  </PermissionLink>
)

export const Default = Template.bind({})
Default.args = {
  children: "0",
  to: "/tab/mplans/18358/Clone of Clone of 1231/2/connections/1037840"
}
