import React, {Component} from 'react';
import PageHeader from "../../../components/PageHeader";
import AppList from "../../../components/AppList";
import {ArrowUP, DocumentIcon, EditIcon, Trash} from "../../Constants";
import {CONTENT_LINKS} from "../NewProgramm/Constants";


const pageData = {
    pageName: "Программа для разработчиков"
}

const data = [
    {
        id: 1,
        name: "Повышение мотивации"
    },
    {
        id: 2,
        name: "увеличение продаж"
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

class Goals extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        const source1 = "adaptationbgoal"
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
        const { items = [] } = this.state
        const newData = items.map(a => {
            console.log(a)
        })
        return (
            <div>
                <PageHeader
                    {...this.props}
                    section="programs"
                    pageData={pageData}
                >
                    <div className="pt-8 pb-6 pl-4">
                        <button
                            className="blue btn width-m pt-1.5"
                        >
                            + Добавить документ
                        </button>
                        <button
                            className="white btn width-m pt-1.5 ml-4"
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

export default Goals;
