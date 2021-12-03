import React, {Component} from 'react';
import PageHeader from "../../components/PageHeader";
import AppList from "../../components/AppList";
import "../levels/style.css"
import {ArrowUP, DocumentIcon, EditIcon, Trash} from "../Constants";

const pageData = {
    pageName: "Программа для разработчиков"
}

const data = [
    {
        id: 1,
        name: "Договор"
    },
    {
        id: 2,
        name: "Презентация о компании"
    },
    {
        id: 3,
        name: "Что необходимо"
    }
]

const DocumentName = ({data}) => {
    return (
        <div className="flex a-i-center">
            <div
                dangerouslySetInnerHTML={{__html: DocumentIcon}}
            />
            <div className="ml-2">
                { data }
            </div>
        </div>
    )
}

const DocumentActions = () => {
    return (
        <div>
            <div className="icon-container transition-icon cursor a-i-center j-c-center display-flex">
                <div
                    className="edit-icon"
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

const settings = [
    {
        id: 1,
        key: "number",
        name: "№",
        // component: numberComponent,
        size: "5%"
    },
    {
        id: 2,
        key: "name",
        name: "Наименование",
        component: DocumentName,
        size: "30%"
    },
    {
        id: 3,
        key: "actions",
        name: "Действия",
        component: DocumentActions,
        size: "30%"
    }
]

class Documents extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    {...this.props}
                    pageData={pageData}
                >
                    <div>
                        DOCUMENTS DOCUMENTS DOCUMENTS
                        DOCUMENTS DOCUMENTS DOCUMENTS
                        DOCUMENTS DOCUMENTS DOCUMENTS
                    </div>
                    <AppList
                        settings={settings}
                        data={data}
                    />
                </PageHeader>
            </div>
        );
    }
}

export default Documents;