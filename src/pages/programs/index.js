import React, {Component} from 'react';
import NavContentBtn from "../../components/NavContentButton";
import { CONTENT_LINKS } from "../../components/Constants"
import AppList from "../../components/AppList";

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
const settings = [
    {

    }
]

class Programs extends Component {
    render() {
        return (
            <div className="h-full">
                <div className="flex justify-between my-3">
                    <div className="text-2xl">
                        Программы
                    </div>
                    <div>
                        Button
                    </div>
                </div>
                <NavContentBtn
                    links={CONTENT_LINKS}
                    className="bg-white"
                />
                <div className="bg-white h-full">
                    Programms Programms Programms Programms Programms
                    Programms Programms Programms Programms Programms
                    Programms Programms Programms Programms Programms
                    Programms Programms Programms Programms Programms
                    Programms Programms Programms Programms Programms
                    Programms Programms Programms Programms Programms
                    <AppList
                        settings={settings}
                        data={programsList}
                    />
                </div>
            </div>
        );
    }
}

Programs.propTypes = {};

export default Programs;