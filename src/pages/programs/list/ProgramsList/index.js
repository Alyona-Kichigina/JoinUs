import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import axios from 'axios';
import {NavLink} from "react-router-dom";
import { settings } from "./Settings";
import {DEFAULT_URL, ADAPTATION_PROGRAM} from "../../../../components/APIList";

class ProgramsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }
    componentDidMount() {
         axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}`)
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        items: response.data
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
        const { items } = this.state
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const subPage = pathnames.length > 1
        return (
            <div className="flex-container">
                {
                    !subPage ? (
                        <div className="flex justify-between my-3">

                                <div className="text-2xl">
                                    Программы
                                </div>
                                <NavLink
                                    className="blue btn width-m flex items-center"
                                    to="/programs/new_program/general"
                                >
                                    + Создать программу
                                </NavLink>

                        </div>
                    ) : (
                        <NavLink
                            className="blue btn width-m flex items-center my-3 ml-4"
                            to="/programs/new_program/general"
                        >
                            + Добавить программу
                        </NavLink>
                    )
                }
              <AppList
                settings={settings}
                data={items}
              />
            </div>
        );
    }
}

ProgramsList.propTypes = {};

export default ProgramsList;
