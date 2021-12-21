import React, {Component} from 'react';
import StateLessForm from "@Components/Forms/StateLessForm"
import { rules, fieldMap } from "./formConfig"
import FilterForEmployees from "./list/FilterForEmployees";
import axios from 'axios';

import dayjs from "dayjs"
import Status from "../../components/ComponentStatus";
import Progress from "../../components/ComponentProgress";
import AppList from "../../components/AppList";
import {settings, data} from "./TableConfig"
import {NavLink} from "react-router-dom";

const BACK_END_URL = "192.168.0.102:9000"



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

  // получаем данные для фильтра
  onInputDate = (value, id) => {
    console.log(value, id)
  }


  handleInput = (payload) => { this.setState(({ value }) => ({ value: { ...value, ...payload } })) }

  render() {
    const { state: { value } } = this
    return (
      <div className="flex-container">
        <div className="flex justify-between p-b-25">
          <h1>Сотрудники</h1>
          <NavLink
            className="blue btn width-m flex items-center"
            to="/employees/new_employ"
          >
            + Создать сотрудника
          </NavLink>
        </div>
        <FilterForEmployees
          handleInput={this.onInputDate}
        />
        <AppList
          settings={settings}
          data={data}
          nestedKey="data"
        />


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
