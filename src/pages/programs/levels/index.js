import React, {Component, useState} from 'react';
import NavContentBtn from "../../../components/NavContentButton";
import { CONTENT_LINKS } from "../../programs/Constants"
// import Breadcrumbs from "../../components/Breadcrumbs";
import AppList from "../../../components/AppList";
import { ActiveIcon } from "../../Constants"
import Actions from "./Actions";
import PageHeader from "../../../components/PageHeader";

const pageData = {
    pageName: "Программа для разработчиков"
}


const programsList = [
    {
        name: "Прграмма для разработчиков",
        time: "3 месяца",
        comment: "Программа для начинающих разработчиков"
    },
    {
        name: "Программа для аналитиков",
        time: "2 месяца",
        comment: "-",
        inside: [
            {
                name: "Программа для разработчиков",
                time: "3 месяца",
                comment: "Программа для начинающих разработчиков"
            },
            {
                name: "Программа для разработчиков",
                time: "3 месяца",
                comment: "-"
            },
            {
                name: "Программа для руководителей",
                time: "3 месяца",
                comment: "-"
            }
        ]
    },
    {
        name: "Прграмма для руководителей",
        time: "3 месяца",
        comment: "-"
    }
]
const levelsList = [
    {
        name: "Немного о нас",
        data: [
            {
                name: "Немного о нас",
                days: "4",
                points: "200",
                status: 1,
            },
            {
                name: "Что необходимо изучить",
                days: "6",
                points: "100",
                status: 1,
            },
            {
                name: "Немного о нас",
                days: "3",
                points: "290",
                status: 1,
            }
        ]
    },
    {
        name: "Как мы работаем",
        data: [
            {
                name: "Наш график",
                days: "4",
                points: "200",
                status: 1,
            },
            {
                name: "Правила офиса",
                days: "6",
                points: "100",
                status: 1,
            }
        ]
    },
    {
        name: "Что необходимо изучить",
        data: [
            {
                name: "Основные регламенты",
                days: "4",
                points: "200",
                status: 1,
            },
            {
                name: "Презентация о компании",
                days: "6",
                points: "100",
                status: 1,
            }
        ]
    }

]

const ActiveIndicator = ({ data } ) => data ? (
    <div className="flex justify-between items-center">
        <div
            dangerouslySetInnerHTML={{__html: ActiveIcon}}
        />
        <div
            className="ml-2"
        >
            {`${data > 0 ? "Активен" : "Неактивен"}`}
        </div>
    </div>
) : ""
const settings = [
    {
        id: 1,
        key: "name",
        name: "уровень/этап",
        size: "30%"
    },
    {
        id: 2,
        key: "days",
        name: "дней этапа",
        nestedLevel: 1,
        size: "15%"
    },
    {
        id: 3,
        key: "points",
        name: "баллов",
        nestedLevel: 1,
        size: "15%"
    },
    {
        id: 4,
        key: "status",
        name: "статус",
        component: ActiveIndicator,
        nestedLevel: 1,
        size: "15%"
    },
    {
        id: 5,
        name: "действия",
        nestedLevel: 1,
        size: "25%",
        component: Actions
    },
]

class Levels extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }

    // 192.168.0.4:5430/AdaptationLevel

    componentDidMount() {
        const source1 = "adaptationcontact"
        // const source1 = "adaptationlevel"
        // http://localhost:9000/api/adaptationlevel/
        fetch(`http://localhost:9000/api/${source1}`, {
            mode: 'no-cors',
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                                    isLoaded: true,
                                    items: result
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
        return (
            <div className="h-full">
                <div>
                    <div>
                         <div className="bg-white h-full">
                             <div className="pt-6 mb-4 ml-4">
                                 <button
                                     className="blue btn width-m pt-1.5"
                                 >
                                     + Добавить уровень
                                 </button>
                                 <button
                                     className="white btn width-m pt-1.5 ml-4"
                                 >
                                     Выбрать уровень
                                 </button>
                             </div>
                             <AppList
                                 settings={settings}
                                 nestedData={true}
                                 data={levelsList}
                                 nestedKey="data"
                             />
                         </div>
                    </div>
                </div>
            </div>
        );
    }
}

Levels.propTypes = {};

export default Levels;
