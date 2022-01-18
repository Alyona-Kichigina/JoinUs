import React from "react";
import Input from "@Components/Fields/Input"
import DatePicker from "@Components/Fields/DatePicker"
import ModalSelectInput from "../../../../components/ModalSelectInput";
import ArrowInput from "../../../../components/ArrowsInput";

export const fieldMap = (toggleCreatorModal, creator, arrowUp, arrowDown) => [
    {
        label: "Наименование",
        id: "level_name",
        component: Input,
        placeholder: "Введите наименование уровня",
        formColumn: 0,
    },
    {
        label: "Программа",
        id: "description",
        component: Input,
        placeholder: "программа",
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
        formColumn: 0,
    },
    {
        label: "Статус",
        id: "status",
        component: Input,
        placeholder: "Выберите статус",
        formColumn: 1,
    },
    {
        label: "Дата создания",
        id: "create_date",
        component: DatePicker,
        placeholder: "Выберите дату создания",
        formColumn: 1,
    },
    {
        label: "Создал",
        id: "creator",
        component: ({onInput}) =>
            <ModalSelectInput
                id="6"
                key="creator"
                value={creator}
                onInput={onInput}
                placeholder="Выберите создателя"
                toggleModal={toggleCreatorModal}
            />,
        formColumn: 1,
    },
]

export const rules = {
    level_name: "required",
    tier: "required",
    status: "required",
    create_date: "required",
    id_employee: "required",
}
