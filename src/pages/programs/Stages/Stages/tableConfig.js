import {ActiveIcon, ArrowUP, EditIcon, Trash} from "../../../Constants";
import React from "react";

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

const Actions = ({handleEdit, data}) => {
    return (
        <div>
            <div className="icon-container transition-icon cursor items-center j-c-center flex">
                <div
                    className="edit-icon"
                    onClick={() => handleEdit(data)}
                    dangerouslySetInnerHTML={{__html: EditIcon}}
                />
                <div className="flex a-i-center j-c-center ml-7">
                    <div
                        className="arrow-icon"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                    <div
                        className="arrow-icon arrow-down"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                </div>
                <div
                    className="trash-icon ml-7"
                    dangerouslySetInnerHTML={{__html: Trash}}
                />
            </div>
        </div>
    )
}

export const settings = (editModal, closeModal, handleEdit) => [
    {
        id: 1,
        key: "number",
        name: "№",
        size: "5%"
    },
    {
        id: 2,
        key: "stage_name",
        name: "Этап",
        size: "30%"
    },
    {
        id: 3,
        key: "days",
        name: "Дней этапа",
        size: "10%"
    },
    {
        id: 3,
        key: "point",
        name: "Баллов",
        size: "10%"
    },
    {
        id: 4,
        key: "status",
        name: "Статус",
        size: "10%",
        component: ActiveIndicator
    },
    {
        id: 5,
        key: "description",
        allData: true,
        name: "Действия",
        component: ({rowIndex, data}) => (
            <Actions
                data={data}
                editModal={editModal}
                closeModal={closeModal}
                handleEdit={handleEdit}
                rowIndex={rowIndex}
            />
        ),
        size: "30%"
    }
]
