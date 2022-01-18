import React from "react";
import Input from "@Components/Fields/Input"
import ArrowInput from "../../../../components/ArrowsInput";

export const fieldMap = (arrowUp, arrowDown) => [
    {
        label: "Наименование",
        id: "stage_name",
        component: Input,
        placeholder: "Введите наименование этапа",
        formColumn: 0,
    },
    {
        label: "Номер п.п",
        id: "tier",
        component: (props) => (
            <ArrowInput
                arrowUp={arrowUp}
                arrowDown={arrowDown}
                {...props}
            />
        ),
        placeholder: "Номер п.п",
        formColumn: 1,
    },
]

export const rules = {
    stage_name: "required",
    tier: "required",
}
