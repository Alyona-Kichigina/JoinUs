import Input from "@Components/Fields/Input"
import Select from "@Components/Fields/Select"
import DatePicker from "@Components/Fields/DatePicker"
import PriceInput from "@Components/Fields/PriceInput";

export const fieldMap = [
  {
    label: "Фамилия",
    id: "SURNAME",
    component: Input,
    placeholder: "Введите фамилию",
    formColumn: 0,
  },
  {
    label: "Имя",
    id: "NAME",
    component: Input,
    placeholder: "Введите имя",
    formColumn: 0,
  },
  {
    label: "Отчество",
    id: "PATRONYMIC",
    component: Input,
    placeholder: "Введите отчество",
    formColumn: 0,
  },
  {
    label: "Должность",
    id: "POSITION",
    component: Select,
    placeholder: "Руководитель проекта",
    formColumn: 0,
  },
  {
    label: "Дата выхода",
    id: "RELEASE_DATE",
    component: DatePicker,
    placeholder: "Выберите дату выхода",
    formColumn: 1,
  },
  {
    label: "Дата активации",
    id: "ACTIVATION_DATE",
    component: DatePicker,
    placeholder: "Выберите дату активации",
    formColumn: 1,
  },
  {
    label: "ЗП",
    id: "SALARY",
    component: PriceInput,
    placeholder: "Введите сумму",
    formColumn: 1,
  },
  {
    label: "Программа адаптации",
    id: "POSITION",
    component: Select,
    placeholder: "Для руководителей проектов",
    formColumn: 1,
  },
]

export const rules = {
  SURNAME: "required",
}
