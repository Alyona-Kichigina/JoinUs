import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import axios from 'axios';
import {NavLink} from "react-router-dom";
import { settings } from "./Settings";
import {DEFAULT_URL, ADAPTATION_PROGRAM, ADAPTATION_LEVELS} from "../../../../components/APIList";
import { levelsBreadcrumbs } from "../../configs";
import ProgramsHeader from "../../ProgramsHeader"
import {LEVELS_LINKS, NEW_PROGRAM} from "../../Constants";

class ProgramsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            levelData: {},
            items: []
        }
    }
    componentDidMount() {
        const {location: {pathname}} = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idLevel = pathnames[1] !== "new_program" ? `/${pathnames[3]}` : ""
        axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}${idLevel}`)
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        levelData: response.data
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
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
    pageHeaderTitle = (level_name) => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === NEW_PROGRAM
        return newProgram ? "Новая программа" : level_name ? `Уровень "${level_name}"` : ""
    }
    render() {
        const { items, levelData: { level_name } } = this.state
        return (
            <ProgramsHeader
                className="flex-container"
                {...this.props}
                pageData={this.pageHeaderTitle(level_name)}
                bredCrumbsConfig={levelsBreadcrumbs}
                url="programs"
                links={LEVELS_LINKS}
            >
                    <NavLink
                        className="blue btn width-m flex items-center my-3 ml-4"
                        to="/programs/new_program/general"
                    >
                        + Добавить программу
                    </NavLink>
                <AppList
                    settings={settings}
                    data={items}
                />
            </ProgramsHeader>
        );
    }
}

ProgramsList.propTypes = {};

export default ProgramsList;
