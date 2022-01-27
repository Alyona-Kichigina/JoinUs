import {NavLink} from "react-router-dom";
import React from "react";

export const settings = (pathname) => [
    {
        id: 1,
        key: "number",
        name: "№",
        size: "5%"
    },
    {
        id: 2,
        key: "level_name",
        name: "Уровень",
        size: "30%",
        allData: true,
        component: ({data: { level_name, id }, data}) => {
            const pathnames = pathname.split("/").filter(x => x)
            const link = `/${pathnames[0]}/${pathnames[1]}/${pathnames[2]}/${id}/level/general`
            return (
                <NavLink
                    to={link}
                >
                    {level_name}
                </NavLink>
            )
        }
    },
    {
        id: 3,
        key: "program_name",
        name: "Программа",
        component: ({data}) => (
            <div>
                {data}
            </div>
        ),
        size: "30%"
    }
]
