import React from "react";
import {ArrowUP, DocumentIcon, EditIcon, Trash} from "../../../Constants";


const DocumentName = ({data}) => {
    return (
        <div className="flex items-center">
            <div
                dangerouslySetInnerHTML={{__html: DocumentIcon}}
            />
            <div className="ml-2">
                { data }
            </div>
        </div>
    )
}


const DocumentActions = ({handleEdit, data, actionButtonTierUp, actionButtonTierDown, actionsDelete}) => {
    const iconColor = data.tier <= 1 ? "0.3" : ""
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
                        onClick={() => actionButtonTierUp(data)}
                        className="arrow-icon"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                    <div
                        onClick={() => actionButtonTierDown(data)}
                        style={{"fill": "var(--color-light-blue-2)", "opacity": iconColor}}
                        className="arrow-icon arrow-down"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                </div>
                <div
                    onClick={() => actionsDelete(data)}
                    className="trash-icon ml-7"
                    dangerouslySetInnerHTML={{__html: Trash}}
                />
            </div>
        </div>
    )
}

export const settings = (editModal, closeModal, handleEdit, actionButtonTierUp, actionButtonTierDown, actionsDeleteItem) => [
    {
        id: 1,
        key: "number",
        name: "№",
        size: "5%"
    },
    {
        id: 2,
        key: "goal_name",
        name: "Наименование",
        component: DocumentName,
        size: "30%"
    },
    {
        id: 3,
        key: "description",
        allData: true,
        name: "Действия",
        component: ({rowIndex, data}) => (
            <DocumentActions
                data={data}
                actionButtonTierUp={actionButtonTierUp}
                actionButtonTierDown={actionButtonTierDown}
                actionsDelete={actionsDeleteItem}
                editModal={editModal}
                closeModal={closeModal}
                handleEdit={handleEdit}
                rowIndex={rowIndex}
            />
        ),
        size: "30%"
    }
]