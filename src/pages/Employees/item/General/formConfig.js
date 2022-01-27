import Input from "@Components/Fields/Input"
import DatePicker from "@Components/Fields/DatePicker"
import PriceInput from "@Components/Fields/PriceInput";
import RefSelect from "@Components/Fields/RefSelect/index"
import {ADAPTATION_PROGRAM, DEFAULT_URL, DIRECTORY} from "../../../../components/APIList";
import axios from "axios";

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
    label: "Телефон",
    id: "mobile_phone",
    component: Input,
    placeholder: "Введите телефон",
    formColumn: 0,
  },
  {
    label: "Должность",
    id: "post",
    component: RefSelect,
    placeholder: "Выберите должность",
    formColumn: 0,
    valueKey: "directory",
    labelKey: "directory",
    preload: true,
    async refLoader() {
      const {data } = await axios.get(`${DEFAULT_URL}/${DIRECTORY}`)
      return data
    },
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
    label: "Почта",
    id: "email",
    component: Input,
    placeholder: "Введите почту",
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
    id: "program",
    component: RefSelect,
    placeholder: "Выберите программу адаптации",
    valueKey: "id",
    labelKey: "program_name",
    preload: true,
    async refLoader() {
      const {data } = await axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}`)
      return data
    },
    formColumn: 1,
  },
]

export const rules = {
  last_name: "required",
  // first_name: "required",
  // program: "required",
  // create_date: "required",
  // release_date: "required"
}
