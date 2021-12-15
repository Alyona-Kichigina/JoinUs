import React, {Component} from 'react';
import PageHeader from "../../../components/PageHeader";
import AppList from "../../../components/AppList";
import "../levels/style.css"
import {ArrowUP, DocumentIcon, EditIcon, Trash} from "../../Constants";
import Modal from "../../../components/ModalWindow";

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

const DocumentActions = () => {
    return (
        <div>
            <div className="icon-container transition-icon cursor items-center j-c-center flex">
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

// AdaptationDocument

class Documents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            editModal: false,
            items: []
        }
    }

    componentDidMount() {
        const source1 = "adaptationdocument"
        fetch(`http://localhost:9000/api/${source1}`, {
            mode: 'no-cors',
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result
                    })
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }
    render() {
        const { editModal, items = [] } = this.state
        // const  newData = items.map(({ document_name, document_link }) => (
        //     {
        //         document_name,
        //         document_link
        //     }
        // ))
        return (
            <div>
                <PageHeader
                    {...this.props}
                    pageData={pageData}
                >
                    <Modal
                        isOpen={editModal}
                        title="редактирование документа"
                        closeModal={() => this.setState({editModal: false})}
                    />
                    <div className="pt-8 pb-6 pl-4">
                        <button
                            className="blue btn width-m pt-1.5"
                        >
                            + Добавить документ
                        </button>
                        <button
                            className="white btn width-m pt-1.5 ml-4"
                            onClick={() => this.setState({ editModal: true })}
                        >
                            Выбрать документ
                        </button>
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