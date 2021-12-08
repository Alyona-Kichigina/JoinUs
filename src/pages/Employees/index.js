import React, {Component} from 'react';
import StateLessForm from "@Components/Forms/StateLessForm"
import { rules, fieldMap } from "./formConfig"
import FilterForEmployees from "./list/FilterForEmployees";
import axios from 'axios';
import CheckBox from "../../components/Fields/CheckBox";
import Calendar from "../../components/Calendar";
import dayjs from "dayjs"
import Status from "../../components/ComponentStatus";
import Progress from "../../components/ComponentProgress";
import AppList from "../../components/AppList";

const BACK_END_URL = "192.168.0.102:9000"

const arrayStatus = [
  {
    id: "statusEnd",
    label: "Завершена",
    icon: "/assets/icons/iconStatus/iconStatusEnd.svg"
  },
  {
    id: "statusWait",
    label: "Ожидание",
    icon: "/assets/icons/iconStatus/iconStatusWait.svg"
  },
  {
    id: "statusWork",
    label: "В процессе",
    icon: "/assets/icons/iconStatus/iconStatusWait.svg"
  }
]

const levelsList = [
  {
    name: "Немного о нас",
    data: [
      {
        name: "Немного о нас",
        days: "4",
        points: "200",
        status: 1,
      },
      {
        name: "Что необходимо изучить",
        days: "6",
        points: "100",
        status: 1,
      },
      {
        name: "Немного о нас",
        days: "3",
        points: "290",
        status: 1,
      }
    ]
  },
  {
    name: "Как мы работаем",
    data: [
      {
        name: "Наш график",
        days: "4",
        points: "200",
        status: 1,
      },
      {
        name: "Правила офиса",
        days: "6",
        points: "100",
        status: 1,
      }
    ]
  },
  {
    name: "Что необходимо изучить",
    data: [
      {
        name: "Основные регламенты",
        days: "4",
        points: "200",
        status: 1,
      },
      {
        name: "Презентация о компании",
        days: "6",
        points: "100",
        status: 1,
      }
    ]
  }
]

const settings = [
  // это надо добавить в компонент таблицы, чтобы была дополнительная колонка с нумерацией
  // {
  //   id: 1,
  //   key: "number",
  //   name: "№",
  //   size: "30%"
  // },
  {
    id: 1,
    key: "emploees",
    name: "Сотрудник",
    nestedLevel: 1,
    size: "15%"
  },
  {
    id: 2,
    key: "points",
    name: "Дата выхода",
    nestedLevel: 1,
    size: "15%"
  },
  {
    id: 3,
    key: "number",
    name: "Дата активации",
    size: "30%"
  },
  {
    id: 4,
    key: "status",
    name: "статус",
    component: Status,
    nestedLevel: 1,
    size: "15%"
  },
  {
    id: 5,
    name: "Прогресс",
    nestedLevel: 1,
    size: "25%",
    component: Progress
  },
]

// employee

class Employees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false
    }
  }
  submitForm = ({ login, password }) => {
    console.log(login, password)
  }

  addEmployees = async () => {
    console.log(dayjs().month())
    // await fetch('192.168.0.102:9000/swagger', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    // });
  }

  onInputCha = (value) => {
    this.setState({ value: value })
  }

  onCalendarInput = (value) => {
    console.log(value)
  }

  handleInput = (payload) => { this.setState(({ value }) => ({ value: { ...value, ...payload } })) }
  render() {
    const { state: { value } } = this
    return (
      <div className="">
        <div className="flex justify-between p-b-25">
          <h1>Сотрудники</h1>
          <button
            className="blue btn width-m"
            name="addEmployees"
            type="submit"
            onClick={this.addEmployees}
          >
            + Создать сотрудника
          </button>
        </div>
        <FilterForEmployees/>
        {arrayStatus.map(({label, icon, id}) => (
          <CheckBox
            key={id}
            label={label}
            id={id}
            value={value}
            onInput={this.onInputCha}
            iconLabel={icon}
            className="p-b-18"
          />
        ))}

        <Status value="end"/>

        <AppList
          settings={settings}
          data={levelsList}
          nestedKey="data"
        />

        {/*<Calendar*/}
        {/*  onInput={this.onCalendarInput}*/}
        {/*  dateFormat="DD.MM.YYYY"*/}
        {/*/>*/}

        {/*<StateLessForm*/}
        {/*  fields={fieldMap}*/}
        {/*  rules={rules}*/}
        {/*  value={value}*/}
        {/*  onInput={this.handleInput}*/}
        {/*  onSubmit={this.submitForm}*/}
        {/*>*/}
        {/*  <button*/}
        {/*    className="blue btn width-medium"*/}
        {/*    name="Login"*/}
        {/*    type="submit"*/}
        {/*  >*/}
        {/*    Сохранить*/}
        {/*  </button>*/}
        {/*</StateLessForm>*/}
      </div>
    );
  }
};

export default Employees;
