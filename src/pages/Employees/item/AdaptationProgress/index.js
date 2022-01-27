import React, {Component, useEffect, useMemo} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import AppList from "../../../../components/AppList";
import {settings} from "./tableConfig";
import axios from "axios";
import {CANDIDATE_LIST, DEFAULT_URL} from "../../../../components/APIList";
import memoizeOne from "memoize-one"

class AdaptationProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      isLoaded: false,
      data: [],
      adaptation_status: [],
      program_details: [],
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
          program_details: response.data.program_details,
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

  getPoint = memoizeOne((data = []) => {
    let sum = 0
    data.forEach(({stages}) => {
      for(let i = 0; i < stages.length; i++){
        sum = sum + parseInt(stages[i].point)
      }
    })
    return sum
  })

  getNewData = memoizeOne((data = [], adaptation_status, program_details) => {
    return data.reduce((acc, item = {}) => {
      const { stages } = item
      acc.push(
        {
          ...item,
          stages: stages.map((i) => ({
            ...i,
            STATUS: {
              adaptation_status: adaptation_status,
              program_details: program_details
            }
          }))
        }
      )
      return acc
    }, [])
  })

  render() {
    const { data, adaptation_status, program_details  } = this.state
    const newData = this.getNewData(data, adaptation_status, program_details)
    const point = this.getPoint(data)

    return (
      <div className="flex-container hidden">
        <div className="flex p-t-16 p-r-16 p-l-16">
          <CardIconAndTitle
            title="Заработано баллов:"
            value={point}
            icon="points"
            className="m-r-16"
          />
          <CardIconAndTitle
            title="Пройдено уровней:"
            value={[2, 3]}
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
