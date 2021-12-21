import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from "@Components/Fields/Input"
import PageHeader from "../../../components/PageHeader";
import InputForm from "../inputForm";
import ModalSelectInput from "../../../components/ModalSelectInput";
import ModalSidebar from "../../../components/ModalSidebar";
import RadioButton from "../../../components/RadioButton";
import {CONTENT_LINKS} from "../Constants";

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

const users = [
    {
        id: 1,
        name: "Максимов И.И"
    },
    {
        id: 2,
        name: "Иванов И.И"
    },
    {
        id: 3,
        name: "Сидоров И.И"
    },
    {
        id: 4,
        name: "Максимов И.В"
    },
    {
        id: 5,
        name: "Иванов И.В"
    },
    {
        id: 6,
        name: "Сидоров И.В"
    },
]

const settings = (toggleModal, client, toggleCreatorModal, creator) => {
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
                Component: ({onInput}) =>
                    <ModalSelectInput
                        id="6"
                        key="creator"
                        value={creator}
                        onInput={onInput}
                        toggleModal={toggleCreatorModal}
                    />
            },
        ]
    }
}

class NewProgram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientModal: false,
            creatorModal: false,
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
        const { clientModal, creatorModal, client, creator, modalState } = this.state
        const toggleModal = () => {
            this.setState({clientModal: !clientModal})
        }
        const toggleCreatorModal = () => {
            this.setState({creatorModal: !creatorModal})
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
                    isOpen={clientModal}
                    handleSave={() => this.setState({
                        client: modalState,
                        clientModal: !clientModal
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
                <ModalSidebar
                    title="Выбор создателя"
                    closeModal={toggleCreatorModal}
                    isOpen={creatorModal}
                    handleSave={() => this.setState({
                        creator: modalState,
                        creatorModal: !creatorModal
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
                         users.map(({name, id}, index) => {
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
                        settings={settings(toggleModal, client, toggleCreatorModal, creator)}
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