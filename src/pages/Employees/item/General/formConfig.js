import Input from "@Components/Fields/Input"
import Select from "@Components/Fields/Select"
import DatePicker from "@Components/Fields/DatePicker"
import PriceInput from "@Components/Fields/PriceInput";

export const fieldMap = [
  {
    label: "Фамилия",
    id: "last_name",
    component: Input,
    placeholder: "Введите фамилию",
    formColumn: 0,
  },
  {
    label: "Имя",
    id: "first_name",
    component: Input,
    placeholder: "Введите имя",
    formColumn: 0,
  },
  {
    label: "Отчество",
    id: "middle_name",
    component: Input,
    placeholder: "Введите отчество",
    formColumn: 0,
  },
  {
    label: "Должность",
    id: "post",
    component: Select,
    placeholder: "Выберите должность",
    formColumn: 0,
  },
  {
    label: "Дата выхода",
    id: "release_date",
    component: DatePicker,
    placeholder: "Выберите дату выхода",
    formColumn: 1,
  },
  {
    label: "Дата активации",
    id: "create_date",
    component: DatePicker,
    placeholder: "Выберите дату активации",
    formColumn: 1,
  },
  {
    label: "ЗП",
    id: "salary",
    component: PriceInput,
    placeholder: "Введите сумму",
    formColumn: 1,
  },
  {
    label: "Программа адаптации",
    id: "POSITION",
    component: Select,
    placeholder: "Выберите программу адаптации",
    formColumn: 1,
  },
]

export const rules = {
  SURNAME: "required",
}
