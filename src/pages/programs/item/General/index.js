import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from "@Components/Fields/Input"
import PageHeader from "../../../../components/PageHeader";
import ModalSelectInput from "../../../../components/ModalSelectInput";
import ModalSidebar from "../../../../components/ModalSidebar";
import RadioButton from "../../../../components/RadioButton";
import { WithValidationHocRenderPropAdapter } from "../../../../Validator";
import { fieldMap, rules} from "./formConfig";
import Form from "@Components/Forms/index"
import { FormContainer } from "./style"
import memoizeOne from "memoize-one";
import axios from "axios";
import {ADAPTATION_LEVELS, DEFAULT_URL} from "../../../../components/APIList";

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

const withSetDisabledFieldsConfigAndSplitByColumns = memoizeOne((config, readOnlyFields = []) => readOnlyFields
    .reduce((acc, c) => {
        const index = acc.findIndex(({ id }) => id === c)
        if (index >= 0) {
            acc[index] = { ...acc[index], disabled: true }
        }
        return acc
    }, [...config])
    .reduce((acc, f) => {
        const { formColumn = 0 } = f
        acc[formColumn].push(f)
        return acc
    }, [[], []]))

class General extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientModal: false,
            creatorModal: false,
            data: {},
            modalState: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
        axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}`)
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        data: response.data
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
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
        console.log(this.state.data)
    }

    inputDataOfProgram = (value) => {
        this.setState(({ data }) => ({ data: { ...data, ...value } }))
    }
    saveDataOfProgram = (v) => {
        console.log(v)
    }

    render() {
        const { history: { goBack } } = this.props
        const { clientModal, creatorModal, modalState, data, data: { CLIENT, CREATOR } } = this.state
        const toggleModal = () => {
            this.setState({clientModal: !clientModal})
        }
        const toggleCreatorModal = () => {
            this.setState({creatorModal: !creatorModal})
        }
        const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap(toggleModal, CLIENT, toggleCreatorModal, CREATOR))
        return (
            <div>
                <ModalSidebar
                    title="Выбор заказчика"
                    closeModal={toggleModal}
                    isOpen={clientModal}
                    handleSave={() => this.setState({
                        data: { ...data, CLIENT: modalState },
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
                        data: { ...data, CREATOR: modalState },
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
                <WithValidationHocRenderPropAdapter
                    onInput={this.inputDataOfProgram}
                    onSubmit={this.saveDataOfProgram}
                    value={data}
                    rules={rules}
                >
                    {(formProps) => {
                        const { formValid, onSubmit, onInput } = formProps
                          return (
                            <div className="h-full flex flex-col justify-between">
                            <div
                                className="mx-8"
                            >
                                <FormContainer>
                                    <Form
                                        {...formProps}
                                        fields={firstForm}
                                        value={data}
                                        onInput={onInput}
                                    />
                                    <Form
                                        {...formProps}
                                        fields={SecondForm}
                                        value={data}
                                        onInput={onInput}
                                    />
                                </FormContainer>
                            </div>
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
                          )}}
                </WithValidationHocRenderPropAdapter>
            </div>
        );
    }
}

General.propTypes = {};

export default General;
