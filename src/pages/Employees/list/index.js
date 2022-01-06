import React, {Component} from 'react';
import FilterForEmployees from "./FilterForEmployees";
import axios from 'axios';
import dayjs from "dayjs"
import AppList from "../../../components/AppList";
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

  addEmployees = async () => {
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
    console.log(999)
    return (
      <div className="flex-container">
        <div className="flex justify-between p-b-25">
          <h1>Сотрудники</h1>
          <NavLink
            className="blue btn width-m flex items-center"
            to="/employees/new_employ/general"
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
      </div>
    );
  }
};

export default Employees;
