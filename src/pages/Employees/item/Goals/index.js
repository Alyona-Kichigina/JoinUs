import React, {Component} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import AppList from "../../../../components/AppList";
import {settings} from "./tableConfig";
import axios from "axios";
import {CANDIDATE_LIST, DEFAULT_URL} from "../../../../components/APIList";

class Goals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      isLoaded: false,
      data: [],
      adaptation_status: [],
      program_details: [],
      documents_detail: []
    }
  }

  componentDidMount() {
    const { location: { pathname }, history: { push } } = this.props
    const pathnames = pathname.split("/").filter(x => x)
    const newEmploy = pathnames[1] === "new_employ"
    const idEmploy = newEmploy ? "/" : `${pathnames[1]}/`
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/${idEmploy}`)
    .then(
      (response) => {
        this.setState({
          isLoaded: true,
          data: response.data.program_details.map(({goals_detail}) => {
            return goals_detail
          }).flat(),
          documents_detail: response.data.program_details.map(({documents_detail}) => {
            return documents_detail
          }).flat(),
          adaptation_status: response.data.adaptation_status,
          program_details: response.data.program_details
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    )
  }
  render() {
    const { data = [], adaptation_status, program_details, documents_detail  } = this.state
    const newData = data.map((item) => ({
        STATUS: {
          adaptation_status,
          program_details
        },
        ...item
      })
    )
// todo как понять сколько всего документов?
    return (
      <div className="flex-container hidden">
        <div className="flex p-t-16 p-r-16 p-l-16">
          <CardIconAndTitle
            title="Заработано баллов:"
            value={data.length}
            icon="points"
            className="m-r-16"
          />
          <CardIconAndTitle
            title="Выполнено целей:"
            value={[documents_detail.length, 3]}
            icon="goals"
          />
        </div>
        <AppList
          settings={settings}
          data={newData}
        />
      </div>
    );
  }
}

export default Goals;
