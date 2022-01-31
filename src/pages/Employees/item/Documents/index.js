import React, {Component} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import {settings} from "./tableConfig";
import AppList from "../../../../components/AppList";
import axios from "axios";
import {CANDIDATE_LIST, DEFAULT_URL} from "../../../../components/APIList";
import memoizeOne from "memoize-one";

class Documents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      isLoaded: false,
      data: [],
      levels_detail: []
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
          data: response.data.program_details.map(({documents_detail}) => {
            return documents_detail
          }).flat(),
          levels_detail: response.data.program_details.map(({levels_detail}) => {
            return levels_detail
          }).flat()
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
  render() {
    const { data = [], levels_detail } = this.state
    const point = this.getPoint(levels_detail)

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
            title="Всего документов:"
            value={data.length}
            icon="documents"
          />
        </div>
        <AppList
          settings={settings}
          data={data}
        />
      </div>
    );
  }
}

export default Documents;
