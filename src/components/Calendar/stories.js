import React from "react"
import { DEFAULT_DATE_FORMAT } from "@/constants"
import Calendar from "./index"

export default {
  title: "Components/DatePicker",
  component: Calendar,
  argTypes: {
    startTimerDate: {
      description: `Дата начала отсчёта принимает дату в формате ${DEFAULT_DATE_FORMAT}`,
    },
    onInput: {
      description: "Обработчик ввода",
    },
    initDate: {
      description: "Определяет текущюю дату т.е. особая подстветка",
    },
    range: {
      description: "Определяет сколько дат будет выбранно во время ввода в календарь 1 или 2",
    },
    value: {
      description: "Значение календаря",
    },
    dateFormat: {
      description: "Формат даты",
    },
    initCalendarView: {
      description: "Начальный UI календаря дни/месяцы и тд",
    },
    dateRange: {
      description: "ограничение дат минимальный, максимальный порог",
    },
    calendarPayload: {
      description: "контекст кастомного рендера дня",
    },
    customDayRender: {
      description: "функция рендера костомных дней",
    },
    disabledDatesTodayDate: {
      description: "Запрещает вводить даты меньше сегоднянего дня",
    },
    disabledNavigation: {
      description: "Отключает навигацию по календарю",
    },
    className: {
      description: "пропс эквивалентый HTML аттрибуту",
    },
    style: {
      description: "пропс эквивалентый HTML аттрибуту",
    },
    id: {
      description: "пропс эквивалентый HTML аттрибуту",
    },
  }
}

const Template = (args) => (
  <div
    style={{ width: "500px", height: "500px" }}
  >
    <Calendar {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = { dateFormat: DEFAULT_DATE_FORMAT, id: "test" }

export const RangePicker = Template.bind({})
RangePicker.args = { ...Default.args, range: true }

export const CustomRender = Template.bind({})
CustomRender.args = {
  ...Default.args,
  disabledNavigation: true,
  calendarPayload: {},
  customDayRender: () => (
    <div style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.5,
      background: "cyan"
    }}
    >
      some event
    </div>
  )
}
