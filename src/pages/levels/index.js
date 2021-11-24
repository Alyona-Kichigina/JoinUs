import React, {Component} from 'react';
import NavContentBtn from "../../components/NavContentButton";
import { CONTENT_LINKS } from "../../components/Constants"
import Breadcrumbs from "../../components/Breadcrumbs";
import AppList from "../../components/AppList";

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

const testComponent = () => (
    <h1>
        TEST TEST TEST TEST
        TEST TEST TEST TEST
        TEST TEST TEST TEST
    </h1>
)
const settings = [
    {
        id: 1,
        key: "name",
        name: "уровень/этап",
        size: "150px"
    },
    {
        id: 2,
        key: "days",
        name: "дней этапа",
        size: "110px"
    },
    {
        id: 3,
        key: "points",
        name: "баллов",
    },
    {
        id: 4,
        key: "status",
        name: "статус",
        size: "100px"
    },
    {
        id: 5,
        name: "действия",
        component: testComponent
    },
]

class Levels extends Component {
    render() {
        const { history } = this.props
        return (
            <div className="h-full">
                <div>
                    <div>
                        <Breadcrumbs
                            {...this.props}
                        />
                    </div>
                    <div className="flex justify-between mb-6 mt-4">
                        <div>
                            { pageData.pageName }
                        </div>
                    </div>
                    <div>
                        <NavContentBtn
                            links={CONTENT_LINKS}

                        />
                         <div className="bg-white h-full">
                             Levels Levels Levels Levels Levels Levels Levels
                             Levels Levels Levels Levels Levels Levels Levels
                             Levels Levels Levels Levels Levels Levels Levels
                             Levels Levels Levels Levels Levels Levels Levels
                             Levels Levels Levels Levels Levels Levels Levels
                             Levels Levels Levels Levels Levels Levels Levels
                             Levels Levels Levels Levels Levels Levels Levels
                             Levels Levels Levels Levels Levels Levels Levels
                             Levels Levels Levels Levels Levels Levels Levels
                             Levels Levels Levels Levels Levels Levels Levels
                             <AppList
                                 settings={settings}
                                 data={levelsList}
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