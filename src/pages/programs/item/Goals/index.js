import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import { DocumentIcon } from "../../../Constants";
import axios from "axios";
import Input from "@Components/Fields/Input"
import ChekBox from "@Components/Fields/CheckBox"
import {DEFAULT_URL, ADAPTATION_PROGRAM, ADAPTATION_GOALS} from "../../../../components/APIList";
import Modal from "../../../../components/ModalWindow";
import {ModalTableBody, ModalTableHeader} from "../Documents/style";
import { settings } from "./FormConfig";

class Goals extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            programData: {},
            editModal: false,
            isLoaded: false,
            goals: [],
            addGoalsModal: false,
            selectedGoals: [],
            modalData: {},
            items: []
        }
    }

    componentDidMount() {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idProgram = pathnames[1] !== "new_program" ? `/${pathnames[2]}` : ""
        axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`)
            .then(
                (response) => {
                    const { data: { goals_detail }, data } = response
                    this.setState({
                        programData: data,
                        isLoaded: true,
                        items: goals_detail
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
        axios.get(`${DEFAULT_URL}/${ADAPTATION_GOALS}`)
            .then(
                (response) => {
                    const { data } = response
                    this.setState({
                        isLoaded: true,
                        goals: data
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
        const {
            items,
            editModal,
            modalData,
            documentSelection,
            modalData: { goal_name },
            selectedGoals,
            addGoalsModal,
            goals
        } = this.state

        const handleEdit = (data) => {
            this.setState({
                editModal: true,
                documentSelection: false,
                modalData: data
            })
        }

        const handleInputChange = (value, id) => {
            this.setState({
                modalData: {...modalData, [id]: value}
            })
        }

        const openGoalSelection = () => this.setState({
            documentSelection: !documentSelection
        })

        const saveEditGoal = ({goal_name}) => {
            const { modalData } = this.state
            const { location: { pathname } } = this.props
            const pathnames = pathname.split("/").filter(x => x)
            axios.put(`${DEFAULT_URL}/${ADAPTATION_GOALS}/${pathnames[2]}/`, {...modalData, goal_name})
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

        const toggleModal = () => this.setState({
            editModal: !editModal
        })

        const checkDocument = (value, id) => {
            this.setState({
                [id]: value
            })
        }

        const saveNewGoals = () => {
            const {
                location: { pathname }
            } = this.props
            const { programData, selectedGoals } = this.state
            const pathnames = pathname.split("/").filter(x => x)
            const idGoal = pathnames[1] !== "new_program" ? `/${pathnames[2]}/` : ""
            const newData = { ...programData, goals: selectedGoals}
            if (selectedGoals.length) {
                axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idGoal}`, newData)
                    .then(
                        (response) => {
                            const {data: {goals_detail}, data} = response
                            this.setState({
                                isLoaded: true,
                                programData: data,
                                items: goals_detail
                            })
                            this.setState({
                                addGoalsModal: false
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
                this.setState({
                    selectedDocuments: []
                })
            }
        }

        return (
            <div>
                <Modal
                    isOpen={editModal}
                    title="редактирование цели"
                    closeModal={() => this.setState({editModal: false})}
                    handleSave={() => saveEditGoal(modalData)}
                >
                    <div>
                        <div className="pt-8">
                    <span
                        className="font-normal color-light-blue-2"
                    >
                        Наименование цели
                    </span>
                            <Input
                                value={goal_name}
                                key="goal_name"
                                id="goal_name"
                                onInput={() => handleInputChange(document.getElementById('goal_name').value, "goal_name")}
                                className="mt-2 font-normal"
                            />
                        </div>
                        <div className="pt-4">
                    <span
                        className="font-normal color-light-blue-2"
                    >
                        Номер п.п.
                    </span>
                            <Input
                                className="mt-2"
                            />
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={documentSelection}
                    title="Выбор цели"
                    closeModal={openGoalSelection}
                    handleSave={() => saveEditGoal(selectedGoals)}
                >
                    <ModalTableHeader>
                        <div>№</div>
                        <div>
                            Наименование цели
                        </div>
                        <div>
                            Наименование программы
                        </div>
                    </ModalTableHeader>
                    {
                        items.map(({goal_name, description, id}, index) => {
                            return (
                                <ModalTableBody>
                                    <div className="flex items-center">
                                        {index + 1}
                                    </div>
                                    <div className="flex items-center">
                                        <div
                                            className="pr-2"
                                            dangerouslySetInnerHTML={{__html: DocumentIcon}}
                                        />
                                        {goal_name}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {description}
                                        </div>
                                        <ChekBox
                                            id="selectedGoals"
                                            value={selectedGoals}
                                            checkBoxValue={id}
                                            onInput={checkDocument}
                                        />
                                    </div>
                                </ModalTableBody>
                            )
                        })
                    }
                </Modal>
                <Modal
                    isOpen={addGoalsModal}
                    title="Добавить цель"
                    closeModal={() => this.setState({
                        addGoalsModal: false
                    })}
                    handleSave={saveNewGoals}
                >
                    <ModalTableHeader>
                        <div>№</div>
                        <div>
                            Наименование цели
                        </div>
                        <div>
                            Наименование программы
                        </div>
                    </ModalTableHeader>
                    {
                        goals.map(({goal_name, description, id}, index) => {
                            return (
                                <ModalTableBody>
                                    <div className="flex items-center">
                                        {index + 1}
                                    </div>
                                    <div className="flex items-center">
                                        <div
                                            className="pr-2"
                                            dangerouslySetInnerHTML={{__html: DocumentIcon}}
                                        />
                                        {goal_name}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {description}
                                        </div>
                                        <ChekBox
                                            id="selectedGoals"
                                            value={selectedGoals}
                                            checkBoxValue={id}
                                            onInput={checkDocument}
                                        />
                                    </div>
                                </ModalTableBody>
                            )
                        })
                    }
                </Modal>
                <div className="pt-8 pb-6 pl-4">
                    <button
                        className="blue btn width-m pt-1.5"
                        onClick={() => this.setState({addGoalsModal: true})}
                    >
                        + Добавить цель
                    </button>
                    <button
                        className="blue btn width-m pt-1.5 ml-4"
                        onClick={openGoalSelection}
                    >
                        Выбрать цель
                    </button>
                </div>
                <AppList
                    settings={settings(editModal, toggleModal, handleEdit)}
                    data={items}
                />
            </div>
        );
    }
}

export default Goals;
