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
        return (
            <div className="h-full">
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
                <div className="bg-white h-full">
                    <AppList
                        settings={settings}
                        data={items}
                    />
                </div>
            </div>
        );
    }
}

ProgramsList.propTypes = {};

export default ProgramsList;
