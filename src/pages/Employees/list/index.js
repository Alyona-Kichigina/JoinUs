import React, {Component} from 'react';
import FilterForEmployees from "./FilterForEmployees";
import axios from 'axios';
import AppList from "../../../components/AppList";
import {settings} from "./TableConfig"
import {NavLink} from "react-router-dom";
import {CANDIDATE_LIST, DEFAULT_URL} from "../../../components/APIList";
import debounce from "@Utils/debounce"
import memoizeOne from "memoize-one";
import Pagination from "@Components/Pagination"

class Employees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: false,
      data: [],
      error: false,
      search: "",
      countList: "",
      page: 1,
      limit: 11
    }
  }
// todo сделать фильтрацию по статусам на фронте
  filterList = (debounce((value, id) => {
    const { data } = this
    if (id === "status") {
      // search
    }
    if (id === "name") {
      axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`, {
        params: {search: value}
      })
      .then((response) => {
          this.setState({ data: response.data.results})
        },
        (error) => {
          this.setState({error})
        }
      )
    } else {
      axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/filter/`, {
        params: {[id]: value}
      })
      .then((response) => {
          this.setState({ data: response.data})
        },
        (error) => {
          this.setState({error})
        }
      )
    }
  }, 250))

  componentDidMount() {
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`)
    .then((response) => {
        this.setState({
          data: response.data.results,
          countList: response.data.count
        })
      },
      (error) => {
        this.setState({error})
      }
    )
  }

  updateData = (value) => {
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/`, {
      params: {page_size: value}
    })
    .then((response) => {
        this.setState({ data: response.data.results})
      },
      (error) => {
        this.setState({error})
      }
    )
    this.setState({ page: value })
  }

  getPaginationState = memoizeOne((page, count, limit, data) => {
    return {
      currentPage: page,
      totalPages:  Math.ceil(count / limit),
      cupReached: data.length !== limit
    }
  })

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
        ...item
      }
    }
    )
  })


  render() {
    const { state: {data, countList, page, limit} } = this
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
          handleInput={this.filterList}
        />
        <AppList
          settings={settings}
          data={newData}
          nestedKey="data"
        />
        <Pagination
          paginationState={this.getPaginationState(page, countList, limit, data)}
          emitPage={this.updateData}
        />
      </div>
    );
  }
};

export default Employees;
