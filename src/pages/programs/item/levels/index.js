import React, { Component } from 'react';
import axios from "axios";
import AppList from "../../../../components/AppList";
import {DEFAULT_URL, ADAPTATION_PROGRAM} from "../../../../components/APIList"
import { NavLink } from "react-router-dom";
import { settings } from "./tableConfig";

class Levels extends Component {



    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}/${pathnames[2]}`)
            .then(
                (response) => {
                    this.setState({
                                    isLoaded: true,
                                    items: response.data.levels_detail
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
    editStage = (data, nestedLevel) => {
        const { id } = data
        const { history: { push } } = this.props
        push(`${id}/${nestedLevel ? "stage" : "level"}/general`)
    }
    render() {
        const { items } = this.state
        const { editStage } = this
        return (
          <div className="flex-container">
              <div className="pt-6 mb-4 ml-4">
                  <NavLink
                    className="blue btn width-m pt-1.5"
                    to="level/general"
                  >
                      + Добавить уровень
                  </NavLink>
                  <button
                    className="white btn width-m pt-1.5 ml-4"
                  >
                      Выбрать уровень
                  </button>
              </div>
              <AppList
                settings={settings(editStage)}
                nestedData={true}
                data={items}
                nestedKey="stages"
              />
          </div>
        );
    }
}

Levels.propTypes = {};

export default Levels;
