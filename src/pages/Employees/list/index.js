import React, {Component} from 'react';
import FilterForEmployees from "./FilterForEmployees";
import axios from 'axios';
import AppList from "../../../components/AppList";
import {settings} from "./TableConfig"
import {NavLink} from "react-router-dom";
import {CANDIDATE_LIST, DEFAULT_URL} from "../../../components/APIList";

class Employees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false,
      data: [],
      error: false,
    }
  }

  // получаем данные для фильтра
  onInputDate = (value, id) => {
    console.log(value, id)
  }

  componentDidMount() {
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}`)
    .then((response) => {
        this.setState({data: response.data.results})
      },
      (error) => {
        this.setState({error})
      }
    )
  }

  handleInput = (payload) => { this.setState(({ value }) => ({ value: { ...value, ...payload } })) }

  render() {
    const { state: {data} } = this
    const newData = data.map(({ last_name, first_name, post, role }) =>
      ({
        EMPLOYEES: {
          name: `${last_name} ${first_name}`,
          role: `${post}`
        },
      })
    )
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
          data={newData}
          nestedKey="data"
        />
      </div>
    );
  }
};

export default Employees;
