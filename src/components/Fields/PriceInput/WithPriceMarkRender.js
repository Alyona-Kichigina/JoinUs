import React from "react"
import {StyleIcon} from "./style"

const WithCurrencySinghRenderer = (Component) => props => (
  <div className="flex justify-space-between h-full">
    <Component {...props} />
    <StyleIcon>RUB</StyleIcon>
  </div>
)

export default WithCurrencySinghRenderer
