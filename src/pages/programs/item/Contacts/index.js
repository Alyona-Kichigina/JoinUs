import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import {DEFAULT_URL, ADAPTATION_PROGRAM, ADAPTATION_CONTACTS} from "../../../../components/APIList";
import axios from "axios";
import {settings} from "./TableConfig";
import { ModalTableHeader, ModalTableBody } from "./style";
import Modal from "../../../../components/ModalWindow";
import { programsBreadcrumbs } from "../../configs";
import ProgramsHeader from "../../ProgramsHeader"
import {NAV_BUTTON_LINKS, NEW_PROGRAM} from "../../Constants";
import ChekBox from "@Components/Fields/CheckBox";

class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            programData: {},
            contacts: [],
            contactsModal: false,
            selectedContacts: [],
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
                    const { data, data: { contacts_detail }} = response
                    this.setState({
                        isLoaded: true,
                        items: contacts_detail,
                        programData: data
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
    componentDidMount() {
       this.loadPageData()
        axios.get(`${DEFAULT_URL}/${ADAPTATION_CONTACTS}`)
            .then((response) => {
                const { data } = response
                this.setState({
                    contacts: data
                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }
    toggleAddContactModal = () => {
        const { contactsModal } = this.state
        this.setState({
            contactsModal: !contactsModal
        })
    }
    checkContact = (value, id) => {
        this.setState({
            [id]: value
        })
    }
    addContacts = () => {
        const { location: { pathname } } = this.props
        const { programData: { contact, program_name, create_date, id, status, tier, employee, duration_day, description }, selectedContacts } = this.state
        const pathnames = pathname.split("/").filter(x => x)
        const idProgram = pathnames[1] !== "new_program" ? `/${pathnames[2]}/` : ""
        const newData = {
            program_name,
            create_date,
            id,
            status,
            tier,
            employee,
            duration_day,
            description,
            contact: contact.concat(selectedContacts.filter(item => !contact.some(a => a === item)))
        }
        axios.put(`${DEFAULT_URL}/${ADAPTATION_PROGRAM}${idProgram}`, newData)
            .then(
                (response) => {
                    const { data, data: { contacts_detail }} = response
                    this.setState({
                        isLoaded: true,
                        items: contacts_detail,
                        programData: data
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                },

            )
        this.setState({
            contactsModal: false,
            selectedContacts: []
        })
    }
    render() {
        const { items = [], contactsModal, selectedContacts, contacts, programData: { program_name } } = this.state
        const { location: { pathname } } = this.props
        const { toggleAddContactModal, checkContact, addContacts } = this
        const newData = items.map(({ last_name, first_name, post, role, email, mobile_phone, illustration_link }) =>
            ({
                value: {
                    name: `${last_name} ${first_name}`,
                    role: `${post}`,
                    img: illustration_link
                },
                role: `${role}`,
                contacts: {
                    mail: email,
                    phone: [mobile_phone]
                }
            })
        )
        const pageHeaderTitle = () => {
            const pathnames = pathname.split("/").filter(x => x)
            const newProgram = pathnames[1] === NEW_PROGRAM
            return newProgram ? "Новая программа" : program_name
        }
        return (
            <>
                <Modal
                    isOpen={contactsModal}
                    closeModal={toggleAddContactModal}
                    handleSave={addContacts}
                >
                    <ModalTableHeader>
                        <div>№</div>
                        <div>
                            Сотрудник
                        </div>
                        <div>
                            Роль
                        </div>
                    </ModalTableHeader>
                    {
                        contacts && contacts.map(({illustration_link, last_name, first_name, middle_name, role, id}, index) => {
                            return (
                                <ModalTableBody>
                                    <span className="flex items-center">
                                        {index + 1}
                                    </span>
                                    <span>
                                        {`${first_name} ${last_name}`}
                                    </span>
                                    <sapn>
                                        {role}
                                    </sapn>
                                    <ChekBox
                                        id="selectedContacts"
                                        value={selectedContacts}
                                        checkBoxValue={id}
                                        onInput={checkContact}
                                    />
                                </ModalTableBody>
                        )})
                    }
                </Modal>
                <ProgramsHeader
                    {...this.props}
                    bredCrumbsConfig={programsBreadcrumbs}
                    pageData={pageHeaderTitle()}
                    url="programs"
                    links={NAV_BUTTON_LINKS}
                >
                    <div
                        className="pt-6 pl-4"
                    >
                        <button
                            className="blue btn width-m"
                            onClick={toggleAddContactModal}
                        >
                            + Добавить контакт
                        </button>
                    </div>
                     <div>
                         <AppList
                             settings={settings}
                             data={newData}
                         />
                     </div>
                </ProgramsHeader>
            </>
        );
    }
}

export default Contacts;
