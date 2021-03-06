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
import { levelsBreadcrumbs } from "../../configs";
import ProgramsHeader from "../../ProgramsHeader"
import {LEVELS_LINKS, NEW_PROGRAM} from "../../Constants";
import ScrollBar from "@Components/ScrollBar"

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

    }
    componentDidMount() {
        this.loadPageData()
        this.loadStages()
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
            modalData: {...modalData, tier: tier > 1 ? tier - 1 : tier}
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
    saveEditStage = ({id, stage_name, tier, point, status, create_date, id_employee, duration_day}) => {
        const newData = { id, stage_name, tier, point, status, create_date, id_employee, duration_day }
        axios.put(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${id}/`, newData)
            .then((response) => {
                this.setState({
                    isLoaded: true
                })
            })
        this.setState({
            editModal: false
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
    saveAddStages = () => {
        const {
            location: { pathname }
        } = this.props
        const { levelData: {id, level_name, tier, status, create_date, id_employee}, selectedStage, stages } = this.state
        const pathnames = pathname.split("/").filter(x => x)
        const selectedData = stages.filter(({id}) => selectedStage.some(i => i === id))
        const idLevel = pathnames[1] !== "new_program" ? `/${pathnames[3]}/` : ""
        const newData = {
            id, level_name, tier, status, create_date, id_employee,
            stages: stages.concat(selectedData.filter(item => !stages.some(a => a === item)))
        }
        axios.put(`${DEFAULT_URL}/${ADAPTATION_LEVELS}${idLevel}`, newData)
            .then((response) => {
                const { data: { stages } } = response
                this.setState({
                    isLoaded: true,
                    items: stages
                })
            })
        this.setState({
            addStageModal: false
        })
    }
    pageHeaderTitle = (level_name) => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === NEW_PROGRAM
        return newProgram ? "?????????? ??????????????????" : level_name ? `?????????????? "${level_name}"` : ""
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
            stages,
            levelData: { level_name }
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
            checkStage,
            pageHeaderTitle
        } = this

        return (
            <ProgramsHeader
                className="h-full"
                {...this.props}
                pageData={pageHeaderTitle(level_name)}
                bredCrumbsConfig={levelsBreadcrumbs}
                url="programs"
                links={LEVELS_LINKS}
            >
                <Modal
                    isOpen={editModal}
                    title="???????????????????????????? ??????????"
                    closeModal={() => this.setState({editModal: false})}
                    handleSave={() => saveEditStage(modalData)}
                >
                    <div>
                        <div className="pt-8">
                    <span
                        className="font-normal color-light-blue-2"
                    >
                        ???????????????????????? ??????????
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
                        ?????????? ??.??.
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
                    title="?????????? ??????????"
                    closeModal={openDocumentSelection}
                    handleSave={() => saveEditStage(selectedStage)}
                >
                    <ModalTableHeader>
                        <div>???</div>
                        <div>
                            ???????????????????????? ??????????
                        </div>
                        <div>
                            ???????????????????????? ????????????
                        </div>
                        <div>
                            ???????????????????????? ??????????????????
                        </div>
                    </ModalTableHeader>
                    {/*{*/}
                    {/*    items && items.map(({description, stage_name}, index) => {*/}
                    {/*        return (*/}
                    {/*            <ModalTableBody>*/}
                    {/*                <div className="flex items-center">*/}
                    {/*                    {index + 1}*/}
                    {/*                </div>*/}
                    {/*                <div className="flex items-center">*/}
                    {/*                    {stage_name}*/}
                    {/*                </div>*/}
                    {/*                <div className="flex items-center justify-between">*/}
                    {/*                    <div>*/}
                    {/*                        {description}*/}
                    {/*                    </div>*/}
                    {/*                    <ChekBox*/}
                    {/*                        id="selectedStage"*/}
                    {/*                        value={selectedStage}*/}
                    {/*                        checkBoxValue={stage_name}*/}
                    {/*                        onInput={checkStage}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*            </ModalTableBody>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                </Modal>
                <Modal
                    isOpen={addStageModal}
                    title="?????????? ??????????"
                    closeModal={() => {closeAddStageModal()}}
                    handleSave={() => saveAddStages(selectedStage)}
                >
                    <ModalTableHeader>
                        <div>???</div>
                        <div>
                            ???????????????????????? ??????????
                        </div>
                        <div>
                            ???????????????????????? ????????????
                        </div>
                        <div>
                            ???????????????????????? ??????????????????
                        </div>
                    </ModalTableHeader>
                    <ScrollBar>
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
                                                className="p-r-14"
                                                value={selectedStage}
                                                checkBoxValue={id}
                                                onInput={checkStage}
                                            />
                                        </div>
                                    </ModalTableBody>
                                )
                            })
                        }
                    </ScrollBar>
                </Modal>
                <div className="pt-8 pb-6 pl-4 flex">
                    <button
                        className="blue btn width-m pt-1.5"
                        onClick={() => ({})}
                    >
                        + ???????????????? ????????
                    </button>
                    <button
                        className="blue btn width-m pt-1.5 ml-4"
                        onClick={() => this.setState({addStageModal: true})}
                    >
                        ?????????????? ????????
                    </button>
                </div>
                <AppList
                    settings={settings(editModal, toggleModal, handleEdit)}
                    data={items}
                />
            </ProgramsHeader>
        );
    }
}

export default levelStages;
