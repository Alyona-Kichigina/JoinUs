import Input from "@Components/Fields/Input"
import DatePicker from "@Components/Fields/DatePicker"
import ModalSelectInput from "../../../../components/ModalSelectInput";
import React from "react";

export const fieldMap = (toggleModal, client, toggleCreatorModal, creator) => [
    {
        label: "Наименование",
        id: "PROGRAM_NAME",
        component: Input,
        placeholder: "Введите наименование программы",
        formColumn: 0,
    },
    {
        label: "Описание",
        id: "DESCRIPTION",
        component: Input,
        type: "textarea",
        minHeight: "195px",
        placeholder: "Описание программы",
        formColumn: 0,
    },
    {
        label: "Срок программы",
        id: "PROGRAM_TIME",
        component: Input,
        placeholder: "Выберите дату выхода",
        formColumn: 1,
    },
    {
        label: "Заказчик",
        id: "CLIENT",
        component: ({onInput}) =>
            <ModalSelectInput
                id="4"
                key="client"
                value={client}
                onInput={onInput}
                placeholder="Выберите заказчика"
                toggleModal={toggleModal}
            />,
        formColumn: 1,
    },
    {
        label: "Дата создания",
        id: "CREATION_DATE",
        component: DatePicker,
        placeholder: "Выберите дату создания",
        formColumn: 1,
    },
    {
        label: "Создал",
        id: "CREATOR",
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
    SURNAME: "required",
}
