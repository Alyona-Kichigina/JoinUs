import React from "react";
import Input from "@Components/Fields/Input"
import DatePicker from "@Components/Fields/DatePicker"
import ModalSelectInput from "../../../../components/ModalSelectInput";
import ArrowInput from "../../../../components/ArrowsInput";
import RefSelect from "@Components/Fields/RefSelect/index"
import Select from "../../../../components/Fields/Select";
import axios from "axios";
import {DEFAULT_URL, ADAPTATION_PROGRAM} from "../../../../components/APIList";

export const fieldMap = (toggleCreatorModal, creator, arrowUp, arrowDown, employees) => [
    {
        label: "Наименование",
        id: "level_name",
        component: Input,
        placeholder: "Введите наименование уровня",
        formColumn: 0,
    },
    {
        label: "Программа",
        id: "program_name",
        component: RefSelect,
        placeholder: "программа",
        formColumn: 0,
        labelKey: "program_name",
        valueKey: "program_name",
        preload: true,
        async refLoader() {
            const {data } = await axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}`)
            return data
        },
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
        component: Select,
        valueKey: "status",
        labelKey: "title",
        options: [
            {
                title: "Активен",
                status: 1
            },
            {
                title: "Неактивен",
                status: 0
            },
        ],
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
        id: "id_employee",
        component: ({onInput}) => {
            const employee = employees && employees.find(({id}) => id === creator)
            const creatorName = employee && creator ? `${employee.first_name} ${employee.last_name}` : ""
            return (
                <ModalSelectInput
                id="6"
                key="id_employee"
                value={creatorName}
                onInput={onInput}
                placeholder="Выберите создателя"
                toggleModal={toggleCreatorModal}
            />
            )},
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
