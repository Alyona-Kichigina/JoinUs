import BsInput from "@Components/Fields/BsInput"

export const fieldMap = [
  {
    label: "Username",
    id: "login",
    component: BsInput,
    placeholder: "Login"
  },
  {
    label: "Password",
    id: "password",
    component: BsInput,
    type: "textarea",
    placeholder: "Password"
  },
]

export const rules = {
  login: "required",
  password: "required"
}
