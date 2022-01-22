import React, {Component} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import AppList from "../../../../components/AppList";
import {settings} from "./tableConfig";
import axios from "axios";
import {CANDIDATE_LIST, DEFAULT_URL} from "../../../../components/APIList";

//levels_detail

class AdaptationProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      isLoaded: false,
      data: [],
      adaptation_status: [],
      program_details: []
    }
  }

  componentDidMount() {
    const { location: { pathname }, history: { push } } = this.props
    const pathnames = pathname.split("/").filter(x => x)
    const newEmploy = pathnames[1] === "new_employ"
    const idEmploy = newEmploy ? "/" : `${pathnames[1]}/`
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}${idEmploy}`)
    .then(
      (response) => {
        this.setState({
          isLoaded: true,
          data: response.data.program_details.map(({levels_detail}) => {
            return levels_detail
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
    const { data = [], adaptation_status, program_details  } = this.state
    const newData = data.map((item ) => ({
        STATUS: {
          adaptation_status: adaptation_status,
          program_details: program_details
        },
        ...item
      })
    )
    // const newData = data.map((item) => {
    //   item.stages.map((i) => {
    //     STATUS: {
    //       adaptation_status: adaptation_status,
    //         program_details: program_details
    //     },
    //     ...i
    //   })
    //   ...item
    // })
    console.log(newData)
    return (
      <div className="flex-container hidden">
        <div className="flex p-t-16 p-r-16 p-l-16">
          <CardIconAndTitle
            title="Заработано баллов:"
            value="800"
            icon="points"
            className="m-r-16"
          />
          <CardIconAndTitle
            title="Пройдено уровней:"
            value="1/3"
            icon="levels"
          />
        </div>
        <AppList
          settings={settings}
          data={newData}
          nestedData={true}
          nestedKey="stages"
        />
      </div>
    );
  }
}

export default AdaptationProgress;
