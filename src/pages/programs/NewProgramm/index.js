import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from "@Components/Fields/Input"
import PageHeader from "../../../components/PageHeader";
import InputForm from "../inputForm";
import ModalSelectInput from "../../../components/ModalSelectInput";
import ModalSidebar from "../../../components/ModalSidebar";
import RadioButton from "../../../components/RadioButton";

const pageData = {
    pageName: "Новая программа"
}

const clients = [
    {
        id: 1,
        name: "ПАО Газпром 111"
    },
    {
        id: 2,
        name: "ПАО Газпром 222"
    },
    {
        id: 3,
        name: "ПАО Газпром 333"
    },
    {
        id: 4,
        name: "ПАО Газпром 444"
    },
]

const settings = (toggleModal, client) => {
   return {
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
                Component: ({onInput}) =>
                    <ModalSelectInput
                        id="4"
                        key="client"
                        value={client}
                        onInput={onInput}
                        toggleModal={toggleModal}
                />
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
}

class NewProgram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            modalState: {},
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

    selectClient = (value) => {
        const { client } = this.state
        this.setState({
            modalState: value === client ? "" : value
        })
    }

    saveNewProgram () {
        console.log(this.state)
    }

    render() {
        const { history: { goBack } } = this.props
        const { modalOpen, client, modalState } = this.state
        const toggleModal = () => {
            this.setState({modalOpen: !modalOpen})
        }
        return (
            <PageHeader
                {...this.props}
                section="programs"
                pageData={pageData}
            >
                <ModalSidebar
                    title="Выбор заказчика"
                    closeModal={toggleModal}
                    isOpen={modalOpen}
                    handleSave={() => this.setState({
                        client: modalState,
                        modalOpen: !modalOpen
                    })}
                >
                    <div
                        className="mx-9"
                    >
                        <div
                            className="grid mt-11 border-list pb-4 color-light-blue-2 fs-14 font-bold"
                            style={{"grid-template-columns": "10% 90%"}}
                        >
                            <div>
                                №
                            </div>
                            <div>
                                Наименование
                            </div>
                        </div>
                     {
                         clients.map(({name, id}, index) => {
                             return (
                                 <div
                                     className="grid py-4 font-semibold fs-14 border-list"
                                     style={{"grid-template-columns": "10% 90%"}}
                                 >
                                     <div
                                         className="flex items-center"
                                     >
                                         {index + 1}
                                     </div>
                                     <RadioButton
                                         inputValue={this.selectClient}
                                         selected={(value) => modalState === value}
                                         title={name}
                                         id={id}
                                     />
                                 </div>
                             )
                         })
                     }
                    </div>
                </ModalSidebar>
                <div className="h-full flex flex-col justify-between">
                    <InputForm
                        state={this.state}
                        settings={settings(toggleModal, client)}
                        onInput={this.handleInputChange}
                    />
                    <div
                        className="flex justify-end pb-20 pr-8"
                    >
                        <div
                            onClick={() => goBack()}
                            className="white btn width-m mr-4"
                        >
                            Отмена
                        </div>
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