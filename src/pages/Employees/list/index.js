import React, {Component} from 'react';
import FilterForEmployees from "./FilterForEmployees";
import axios from 'axios';
import AppList from "../../../components/AppList";
import {settings} from "./TableConfig"
import {NavLink} from "react-router-dom";
import {CANDIDATE_LIST, DEFAULT_URL, CANDIDATE_FILTER} from "../../../components/APIList";
import debounce from "@Utils/debounce"
import memoizeOne from "memoize-one";
import EditDateForSave from "../../../utils/Date/EditDateForSave";
import {RELEASE_DATE_FORMAT, CREATE_DATE_FORMAT} from "@constants"

// todo добавить пагинацию

class Employees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false,
      data: [],
      error: false,
    }
  }
// todo сделать фильтрацию по статусам на фронте
  onInputDate = (debounce((value, id) => {
    console.log(value, id)
    axios.get(`${DEFAULT_URL}/${CANDIDATE_FILTER}`, {params: {
        [id]: value
    }})
    .then((response) => {
        this.setState({data: response.data})
      },
      (error) => {
        this.setState({error})
      }
    )
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
    return data.map((item) => ({
        EMPLOYEES: {
          name: `${item.last_name} ${item.first_name}`,
          role: `${item.post}`
        },
        STATUS: {
          adaptation_status: item.adaptation_status,
          program_details: item.program_details
        },
        ...item
      })
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
