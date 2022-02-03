import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import "../levels/style.css"
import {PlusIcon, DocumentIcon} from "../../../Constants";
import Modal from "../../../../components/ModalWindow";
import Input from "@Components/Fields/Input"
import ChekBox from "@Components/Fields/CheckBox"
import axios from "axios";
import {ADAPTATION_PROGRAM, ADAPTATION_DOCUMENT, DEFAULT_URL} from "../../../../components/APIList";
import {ModalTableHeader, ModalTableBody} from "./style";
import ArrowInput from "../../../../components/ArrowsInput";
import { settings } from "./tableConfig";
import PhotoFiles from "../../../../components/Fields/Files/PhotoFiles";
import { programsBreadcrumbs } from "../../configs";
import ProgramsHeader from "../../ProgramsHeader"
import {NAV_BUTTON_LINKS, NEW_PROGRAM} from "../../Constants";

class Documents extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            documentModal: false,
            editModal: false,
            modalData: {},
            addNewDocument: false,
            documentSelection: false,
            selectedDocuments: [],
            programData: {},
            documents: [],
            items: []
        }
    }

    loadPageData = () => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idProgram = pathnames[1] !== "new_program" ? `/${pathnames[2]}` : ""
        axios.get(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`)
            .then(
                (response) => {
                    const { data: { documents_detail }, data } = response
                    this.setState({
                        programData: data,
                        isLoaded: true,
                        items: documents_detail
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
        axios.get(`${DEFAULT_URL}/${ADAPTATION_DOCUMENT}`)
            .then(
                (response) => {
                    const { data } = response
                    this.setState({
                        isLoaded: true,
                        documents: data
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
    checkDocument = (value, id) => {
        this.setState({
            [id]: value
        })
    }
    checkNewDocument = (value, id) => {
        this.setState({
            [id]: value
        })
    }
    saveEditDocument = (closeModal, data) => {
        const { id } = data
        axios.put(`${DEFAULT_URL}/${ADAPTATION_DOCUMENT}/${id}/`, data)
            .then(
                (response) => {
                    const { data: { documents_detail } } = response
                    this.setState({
                        isLoaded: true,
                        data: documents_detail
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
        this.loadPageData()
        this.setState({
            editModal: false
        })
    }
    saveSelectedDocuments = () => {
        this.setState({
            selectedDocuments: [],
            documentSelection: false
        })
    }
    saveNewDocuments = (closeModal) => {
        const {
            location: { pathname }
        } = this.props
        const { programData, programData: { documents }, selectedDocuments } = this.state
        const pathnames = pathname.split("/").filter(x => x)
        const idProgram = pathnames[1] !== "new_program" ? `/${pathnames[2]}/` : ""
        const newData = { ...programData, documents: documents.concat(selectedDocuments.filter(item => !documents.some(a => a === item))) }
        if (selectedDocuments.length) {
            axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`, newData)
                .then(
                    (response) => {
                        const {data: {documents_detail}, data} = response
                        this.setState({
                            isLoaded: true,
                            programData: data,
                            items: documents_detail
                        })
                        closeModal()
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
    addDocument = () => {
        const { addNewDocument } = this.state
        this.setState({
            addNewDocument: !addNewDocument
        })
    }
    openDocumentSelection = () => {
        const { documentSelection } = this.state
        this.setState({
            documentSelection: !documentSelection
        })
    }
    handleInputChange = (value, id) => {
        const { modalData } = this.state
        this.setState({
            modalData: { ...modalData, [id]: value}
        })
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
    closeModal = () => this.setState({editModal: false})
    deleteItem = (id) => {
        const {
            location: { pathname }
        } = this.props
        const { programData, programData: { documents } } = this.state
        const newData = {...programData, documents: documents.filter(item => item !== id)}
        const pathnames = pathname.split("/").filter(x => x)
        const idProgram = pathnames[1] !== "new_program" ? `/${pathnames[2]}/` : ""
        axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`, newData)
            .then(
                (response) => {
                    const { data: { documents_detail }, data } = response
                    this.setState({
                        isLoaded: true,
                        programData: data,
                        items: documents_detail
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
    actionButtonTierUp = (data) => {
        const { id, tier } = data
        const newData = { ...data, tier: tier + 1 }
        axios.put(`${DEFAULT_URL}/${ADAPTATION_DOCUMENT}/${id}/`, newData)
        this.loadPageData()
    }
    actionButtonTierDown = (data) => {
        const { id, tier } = data
        if (tier > 1) {
            const newData = { ...data, tier: tier - 1 }
            axios.put(`${DEFAULT_URL}/${ADAPTATION_DOCUMENT}/${id}/`, newData)
            this.loadPageData()
        }
    }
    pageHeaderTitle = (program_name) => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newProgram = pathnames[1] === NEW_PROGRAM
        return newProgram ? "Новая программа" : program_name
    }
    render() {
        const {
            editModal,
            items,
            documents,
            modalData: {document_name, document_link, tier},
            modalData,
            documentSelection,
            selectedDocuments,
            addNewDocument,
            programData: { program_name }
        } = this.state
        const handleEdit = (data) => this.setState({
            editModal: true,
            modalData: data
        })
        const {
            actionButtonTierUp,
            actionButtonTierDown,
            pageHeaderTitle
        } = this
        return (
                <ProgramsHeader
                    className="h-full"
                    {...this.props}
                    pageData={pageHeaderTitle(program_name)}
                    bredCrumbsConfig={programsBreadcrumbs}
                    url="programs"
                    links={NAV_BUTTON_LINKS}
                >
                    <Modal
                        isOpen={editModal}
                        title="редактирование документа"
                        closeModal={this.closeModal}
                        handleSave={() => this.saveEditDocument(this.closeModal, modalData)}
                    >
                        <div>
                            <div className="pt-8">
                                <span
                                    className="font-normal color-light-blue-2"
                                >
                                    Наименование документа
                                </span>
                                <Input
                                    value={document_name}
                                    key="document_name"
                                    id="document_name"
                                    onInput={() => this.handleInputChange(document.getElementById('document_name').value, "document_name")}
                                    className="mt-2 font-normal"
                                />
                            </div>
                            <div className="pt-4">
                        <span
                            className="font-normal color-light-blue-2"
                        >
                            Номер п.п.
                        </span>
                                <div className="relative">
                                    <ArrowInput
                                        value={tier}
                                        arrowUp={this.tierUp}
                                        arrowDown={this.tierDown}
                                    />
                                </div>
                            </div>
                            <div
                                className="pt-8"
                            >
                                <PhotoFiles
                                    value={[document_link]}
                                />
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        isOpen={documentSelection}
                        title="Выбор документа"
                        closeModal={this.openDocumentSelection}
                        handleSave={() => this.saveSelectedDocuments()}
                    >
                        <ModalTableHeader>
                            <div>№</div>
                            <div>
                                Наименование документа
                            </div>
                            <div>
                                Наименование программы
                            </div>
                        </ModalTableHeader>
                           {
                               items && items.map(({document_name, id}, index) => {
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
                                               {document_name}
                                           </div>
                                           <div className="flex items-center justify-between">
                                               <div>
                                                   {document_name}
                                               </div>
                                               <ChekBox
                                                   id="selectedDocuments"
                                                   value={selectedDocuments}
                                                   checkBoxValue={id}
                                                   onInput={this.checkDocument}
                                               />
                                           </div>
                                       </ModalTableBody>
                                   )
                               })
                           }
                    </Modal>
                    <Modal
                        isOpen={addNewDocument}
                        title="Добавить документ"
                        closeModal={() => {this.setState({
                            addNewDocument: !addNewDocument
                        })}}
                        handleSave={() => this.saveNewDocuments(() => {this.setState({
                            addNewDocument: !addNewDocument
                        })})}
                    >
                        <ModalTableHeader>
                            <div>№</div>
                            <div>
                                Наименование документа
                            </div>
                            <div>
                                Наименование программы
                            </div>
                        </ModalTableHeader>
                           {
                               documents.map(({document_name, id}, index) => {
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
                                               {document_name}
                                           </div>
                                           <div className="flex items-center justify-between">
                                               <div>
                                                   {document_name}
                                               </div>
                                               <ChekBox
                                                   id="selectedDocuments"
                                                   value={selectedDocuments}
                                                   checkBoxValue={id}
                                                   onInput={this.checkNewDocument}
                                               />
                                           </div>
                                       </ModalTableBody>
                                   )
                               })
                           }
                    </Modal>
                    <div className="pt-8 pb-6 pl-4 flex">
                        <button
                            className="blue btn width-m pt-1.5"
                            onClick={this.addDocument}
                        >
                            + Добавить документ
                        </button>
                        <button
                            className="blue btn width-m pt-1.5 ml-4"
                            onClick={this.openDocumentSelection}
                        >
                            Выбрать документ
                        </button>
                    </div>
                    <AppList
                        settings={settings(editModal, this.closeModal, handleEdit, this.deleteItem, actionButtonTierUp, actionButtonTierDown)}
                        data={items}
                    />
                </ProgramsHeader>
        );
    }
}

export default Documents;
