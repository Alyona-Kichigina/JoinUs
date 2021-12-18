import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from "@Components/Fields/Input"
import PageHeader from "../../../components/PageHeader";
import { FormContainer } from "./style";
import InputForm from "../inputForm";

const pageData = {
    pageName: "Новая программа"
}

const settings = {
    1: [
        {
            id: 1,
            name: "Наименование",
            key: "name",
            Component: Input,
            props: {
                placeholder: ""
            }
        },
        {
            id: 2,
            name: "Описание",
            key: "description",
            props: {
                minHeight: "178px",
                type: "textarea"
            },
            Component: Input
        }
    ],
    2: [
        {
            id: 3,
            name: "Срок программы",
            key: "time",
            Component: Input
        },
        {
            id: 4,
            name: "Заказчик",
            key: "client",
            Component: Input
        },
        {
            id: 5,
            name: "дата создания",
            key: "date",
            Component: Input
        },
        {
            id: 6,
            name: "создатель",
            key: "creator",
            Component: Input
        },
    ]
}

class NewProgram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            time: "",
            client: "",
            date: "",
            creator: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange (value, id) {

        this.setState({
            [id]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    saveNewProgram () {
        console.log(this.state)
    }

    render() {
        return (
            <PageHeader
                {...this.props}
                pageData={pageData}
            >
                <div className="h-full flex flex-col justify-between">
                    <InputForm
                        state={this.state}
                        settings={settings}
                        onInput={this.handleInputChange}
                    />
                    <div
                        className="flex justify-end pb-20 pr-8"
                    >
                        <button
                            className="white btn width-m mr-4"
                        >
                            Отмена
                        </button>
                        <button
                            className="blue btn width-m"
                            onClick={() => this.saveNewProgram()}
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            </PageHeader>
        );
    }
}

NewProgram.propTypes = {};

export default NewProgram;