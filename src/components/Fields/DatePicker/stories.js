import React from "react"

import { PRESENT_DATE_FORMAT } from "@/constants"
import DatePicker from "./index"

export default {
  title: "Components/Fields/DatePicker",
  component: DatePicker,
  argTypes: {
    formPayload: {
      description: "Объект для сохранения дать"
    },
    onInput: {
      description: "HTML свойство обработчик события"
    },
    id: {
      description: "id компонента"
    },
    dateFormat: {
      description: "Формат даты"
    },
    range: {
      description: "Определяет сколько дат будет выбранно во время ввода в календарь 1 или 2"
    },
    allWaysOpen: {
      description: "При клике на компонент календарь открывается статично"
    },
    styleWrapperCalendar: {
      description: "HTML свойство стиль"
    },
    tipMaxSize: {
      description: "Максимальная ширина типсы"
    },
    placeholder: {
      description: "placeholder компонента"
    },
    rangeId: {
      description: "второй ключ куда идет сохранение даты"
    },
    maxDate: {
      description: "Верхнее ограничение для выбора даты"
    },
    minDate: {
      description: "Нижнее ограничение для выбора даты"
    },
    containerStatic: {
      description: "Статичное открывание контейнера"
    },
    disabledDatesTodayDate: {
      description: "Запрещает вводить даты меньше сегоднянего дня"
    },
    disabled: {
      description: "HTML блокировка"
    },
    onFocus: {
      description: "HTML свойство обработчик события"
    },
    inputRef: {
      description: "HTML элемент"
    },
    onBlur: {
      description: "HTML свойство обработчик события"
    },
    children: {
      description: "React children"
    },
    value: {
      description: "Массив значения календаря",
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
    <DatePicker {...args} id="DatePicker" />
    <DatePicker {...args} id="DatePicker" value={[]} />
    <DatePicker {...args} id="DatePicker" disabled />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  formPayload: { DatePicker: [] },
  value: ["21.04.2020 00:00"],
  dateFormat: PRESENT_DATE_FORMAT,
  tipMaxSize: "310",
  placeholder: "DD.MM.YYYY",
  className: "",
  onFocus: () => null,
  inputRef: () => null,
  onBlur: () => null,
}
