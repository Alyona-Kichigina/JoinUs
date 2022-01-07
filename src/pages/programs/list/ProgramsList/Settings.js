import {NavLink} from "react-router-dom";
import React from "react";

export const settings  = [
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
            // allData: true,
            component: ({data}) => {
                console.log(data)
                return (
                    <NavLink
                        to={`/programs/${data}/general`}
                    >
                        {data}
                    </NavLink>
                )
            }
        },
        {
            id: 3,
            key: "duration_day",
            name: "Срок адаптации",
            component: ({data}) => (
                <div>
                    {data} дней
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