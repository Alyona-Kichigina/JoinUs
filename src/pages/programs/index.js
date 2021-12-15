import React, {Component} from 'react';
import NavContentBtn from "../../components/NavContentButton";
import { CONTENT_LINKS } from "./NewProgramm/Constants"
import AppList from "../../components/AppList";
import {NavLink} from "react-router-dom";

const settings = [
    {
        id: 1,
        key: "number",
        name: "№",
        size: "5%"
    },
    {
        id: 2,
        key: "program_name",
        name: "Программа",
        size: "25%",
    },
    {
        id: 3,
        key: "duration_day",
        name: "Срок адаптации",
        component: ({data}) => (
                <div>
                    { data } дней
                </div>
            ),
        size: "15%"
    },
    {
        id: 4,
        key: "description",
        name: "Комментарии",
        size: "55%"
    }
]

class Programs extends Component {
    // AdaptationProgram
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }
    componentDidMount() {
        fetch(`http://localhost:9000/api/adaptationprogram`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        items: response
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
                        to="/programs/new_programm"
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

Programs.propTypes = {};

export default Programs;
