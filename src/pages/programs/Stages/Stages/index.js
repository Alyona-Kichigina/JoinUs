import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import axios from "axios";
import Input from "@Components/Fields/Input"
import ChekBox from "@Components/Fields/CheckBox"
import {DEFAULT_URL, ADAPTATION_STAGE, ADAPTATION_LEVELS} from "../../../../components/APIList";
import Modal from "../../../../components/ModalWindow";
import {ModalTableBody, ModalTableHeader} from "./style";
import {settings} from "./tableConfig";
import ArrowInput from "../../../../components/ArrowsInput";

class levelStages extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            editModal: false,
            isLoaded: false,
            addStageModal: false,
            levelData: {},
            selectedStage: [],
            modalData: {},
            stages: [],
            items: []
        }
    }

    loadStages = () => {
        axios.get(`${DEFAULT_URL}/${ADAPTATION_STAGE}`)
            .then((response) => {
                const { data } = response
                this.setState({
                    stages: data
                })
            })
    }

    loadPageData = () => {
        const {
            location: { pathname }
        } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idLevel = pathnames[1] !== "new_program" ? `/${pathnames[3]}/` : ""
        axios.get(`${DEFAULT_URL}/${ADAPTATION_LEVELS}${idLevel}`)
            .then(
                (response) => {
                    const { data, data: { stages } } = response
                    this.setState({
                        isLoaded: true,
                        levelData: data,
                        items: stages
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
        this.loadStages()
    }

    componentDidMount() {
        this.loadPageData()
    }
    tierUp = () => {
        const {  modalData, modalData: { tier } } = this.state
        this.setState({
            modalData: { ...modalData, tier: tier + 1}
        })
    }
    tierDown = () => {
        const {  modalData, modalData: { tier } } = this.state
        this.setState({
            modalData: { ...modalData, tier: tier > 1 ? tier - 1 : tier}
        })
    }
    toggleModal = () => {
        const { editModal } = this.state
        this.setState({
            editModal: !editModal
        })
    }
    handleEdit = (data) => {
        this.setState({
            editModal: true,
            StageSelection: false,
            modalData: data
        })
    }
    handleInputChange = (value, id) => {
        const { modalData } = this.state
        this.setState({
            modalData: { ...modalData, [id]: value}
        })
    }
    saveEditStage = (data) => {
        const { id } = data
        axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${id}/`, data)
            .then((response) => {
                this.setState({
                    isLoaded: true
                })
            })
        this.loadPageData()
    }

    openDocumentSelection = () => {
        const { StageSelection } = this.state
        this.setState({
            StageSelection: !StageSelection
        })
    }

    checkStage = (value, id) => {
        this.setState({
            [id]: value
        })
    }
    closeAddStageModal = () => {
        this.setState({
            addStageModal: false,
            selectedStage: []
        })
    }
    saveAddStages = (value) => {
        const {
            location: { pathname }
        } = this.props
        const { levelData, selectedStage, stages } = this.state
        const pathnames = pathname.split("/").filter(x => x)
        const selectedData = stages.filter(({id}) => selectedStage.some(i => i === id))
        const idLevel = pathnames[1] !== "new_program" ? `/${pathnames[3]}/` : ""
        const newData = { ...levelData, stages: stages.concat(selectedData.filter(item => !stages.some(a => a === item)))}
        axios.put(`${DEFAULT_URL}/${ADAPTATION_LEVELS}${idLevel}`, newData)
            .then((response) => {
                const { data } = response
                this.setState({
                    isLoaded: true,
                    items: data
                })
            })
    }

    render() {
        const {
            items,
            editModal,
            modalData,
            StageSelection,
            modalData: { stage_name, tier },
            selectedStage,
            addStageModal,
            stages
        } = this.state

        const {
            closeAddStageModal,
            saveAddStages,
            tierUp,
            tierDown,
            toggleModal,
            handleEdit,
            handleInputChange,
            saveEditStage,
            openDocumentSelection,
            checkStage
        } = this

        return (
            <div>
                <Modal
                    isOpen={editModal}
                    title="редактирование этапа"
                    closeModal={() => this.setState({editModal: false})}
                    handleSave={() => saveEditStage(modalData)}
                >
                    <div>
                        <div className="pt-8">
                    <span
                        className="font-normal color-light-blue-2"
                    >
                        Наименование этапа
                    </span>
                            <Input
                                value={stage_name}
                                key="stage_name"
                                id="stage_name"
                                onInput={() => handleInputChange(document.getElementById('stage_name').value, "stage_name")}
                                className="mt-2 font-normal"
                            />
                        </div>
                        <div className="pt-4">
                    <span
                        className="font-normal color-light-blue-2"
                    >
                        Номер п.п.
                    </span>
                            <div
                                className="relative"
                            >
                                <ArrowInput
                                    id="tier"
                                    key="tier"
                                    value={tier}
                                    top="20px"
                                    arrowUp={tierUp}
                                    arrowDown={tierDown}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={StageSelection}
                    title="Выбор этапа"
                    closeModal={openDocumentSelection}
                    handleSave={() => saveEditStage(selectedStage)}
                >
                    <ModalTableHeader>
                        <div>№</div>
                        <div>
                            Наименование этапа
                        </div>
                        <div>
                            Наименование уровня
                        </div>
                        <div>
                            Наименование программы
                        </div>
                    </ModalTableHeader>
                    {
                        items.map(({description, stage_name}, index) => {
                            return (
                                <ModalTableBody>
                                    <div className="flex items-center">
                                        {index + 1}
                                    </div>
                                    <div className="flex items-center">
                                        {stage_name}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {description}
                                        </div>
                                        <ChekBox
                                            id="selectedStage"
                                            value={selectedStage}
                                            checkBoxValue={stage_name}
                                            onInput={checkStage}
                                        />
                                    </div>
                                </ModalTableBody>
                            )
                        })
                    }
                </Modal>
                <Modal
                    isOpen={addStageModal}
                    title="Добавить этап"
                    closeModal={() => {closeAddStageModal()}}
                    handleSave={() => saveAddStages(selectedStage)}
                >
                    <ModalTableHeader>
                        <div>№</div>
                        <div>
                            Наименование этапа
                        </div>
                        <div>
                            Наименование уровня
                        </div>
                        <div>
                            Наименование программы
                        </div>
                    </ModalTableHeader>
                    {
                        stages.map(({description, stage_name, id}, index) => {
                            return (
                                <ModalTableBody>
                                    <div className="flex items-center">
                                        {index + 1}
                                    </div>
                                    <div className="flex items-center">
                                        {stage_name}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            {description}
                                        </div>
                                        <ChekBox
                                            id="selectedStage"
                                            value={selectedStage}
                                            checkBoxValue={id}
                                            onInput={checkStage}
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
                        onClick={() => this.setState({addStageModal: true})}
                    >
                        + Добавить этап
                    </button>
                    <button
                        className="blue btn width-m pt-1.5 ml-4"
                        onClick={() => this.setState({addStageModal: true})}
                    >
                        Выбрать этап
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

export default levelStages;
