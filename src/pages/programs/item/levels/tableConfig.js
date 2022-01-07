import React from "react";
import Actions from "./Actions";
import {ActiveIcon} from "../../../Constants";

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

export const settings = [
    {
        id: 1,
        key: ["level_name", "stage_name"],
        name: "уровень/этап",
        size: "30%"
    },
    {
        id: 2,
        key: "duration_day",
        name: "дней этапа",
        nestedLevel: 1,
        size: "15%"
    },
    {
        id: 3,
        key: "point",
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
