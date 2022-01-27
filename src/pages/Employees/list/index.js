import React, {Component} from 'react';
import FilterForEmployees from "./FilterForEmployees";
import axios from 'axios';
import AppList from "../../../components/AppList";
import {settings} from "./TableConfig"
import {NavLink} from "react-router-dom";
import {CANDIDATE_LIST, DEFAULT_URL, CANDIDATE_FILTER, CANDIDATE_SEARCH} from "../../../components/APIList";
import debounce from "@Utils/debounce"
import memoizeOne from "memoize-one";
import List from "./list"

// todo добавить пагинацию

class Employees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false,
      data: [],
      error: false,
      search: ""
    }
  }
// todo сделать фильтрацию по статусам на фронте
  onInputDate = (debounce((value, id) => {
    const { data } = this
    const newParams = id === "name" ? {search: value} : {[id]: value}
    if (id === "status") {
      // search
    } else {
      axios.get(`${DEFAULT_URL}/candidate/${id === "name" ? "" : "filter/"}`, {
        params: newParams
      })
      .then((response) => {
          this.setState({ data: id === "name" ? response.data.results : response.data})
        },
        (error) => {
          this.setState({error})
        }
      )
    }
  }, 250))

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

  getNewData = memoizeOne((data) => {
    return data.map((item) => {
      const { last_name, first_name, post, adaptation_status, program_details } = item
      return {
        EMPLOYEES: {
          name: `${last_name} ${first_name}`,
          role: `${post}`
        },
        STATUS: {
          adaptation_status: adaptation_status,
          program_details: program_details
        },
        // NEW_STATUS: "dd",
        ...item
      }
    }
    )
  })

  render() {
    const { state: {data} } = this
    const newData = this.getNewData(data)
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
