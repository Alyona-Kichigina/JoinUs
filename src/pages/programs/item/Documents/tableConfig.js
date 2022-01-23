import ActionsButtons from "../../../../components/ActionsButtons";
import React from "react";
import {DocumentIcon} from "../../../Constants";


const DocumentName = ({data}) => (
    <div className="flex items-center">
        <div
            dangerouslySetInnerHTML={{__html: DocumentIcon}}
        />
        <div className="ml-2">
            { data }
        </div>
    </div>
)

export const settings = (editModal, closeModal, handleEdit, deleteItem, actionButtonTierUp, actionButtonTierDown) => [
    {
        id: 1,
        key: "number",
        name: "№",
        size: "5%"
    },
    {
        id: 2,
        key: "document_name",
        name: "Наименование",
        component: DocumentName,
        size: "30%"
    },
    {
        id: 3,
        key: "actions",
        allData: true,
        name: "Действия",
        component: ({data}) => (
            <ActionsButtons
                data={data}
                arrowUp={actionButtonTierUp}
                arrowDown={actionButtonTierDown}
                deleteItem={deleteItem}
                handleEdit={handleEdit}
                dataKey="tier"
            />
        ),
        size: "30%"
    }
]
