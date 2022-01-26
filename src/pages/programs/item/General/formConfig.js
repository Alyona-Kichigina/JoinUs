import Input from "@Components/Fields/Input"
import DatePicker from "@Components/Fields/DatePicker"
import ModalSelectInput from "../../../../components/ModalSelectInput";
import React from "react";
import {CREATE_DATE_FORMAT} from "@constants"

export const fieldMap = (toggleModal, customer, toggleCreatorModal, creator) => [
    {
        label: "Наименование",
        id: "program_name",
        component: Input,
        placeholder: "Введите наименование программы",
        formColumn: 0,
    },
    {
        label: "Описание",
        id: "description",
        component: Input,
        type: "textarea",
        minHeight: "195px",
        placeholder: "Описание программы",
        formColumn: 0,
    },
    {
        label: "Срок программы",
        id: "duration_day",
        component: Input,
        placeholder: "Выберите срок программы",
        formColumn: 1,
    },
    {
        label: "Заказчик",
        id: "customer",
        component: ({onInput}) =>
        {
                return (
                 <ModalSelectInput
                     id="4"
                     key="customer"
                     value={customer ? customer.customer_name : ""}
                     onInput={onInput}
                     placeholder="Выберите заказчика"
                     toggleModal={toggleModal}
                 />)
        },
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
        component: ({onInput}) => {
            const creatorName = creator ? `${creator.first_name} ${creator.last_name}` : ""
            return (
            <ModalSelectInput
                id="6"
                key="creator"
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
    // SURNAME: "required",
}
