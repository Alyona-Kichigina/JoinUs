import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import {DEFAULT_URL, ADAPTATION_PROGRAM} from "../../../../components/APIList";
import axios from "axios";
import {settings} from "./TableConfig";
import { programsBreadcrumbs } from "../../configs";
import ProgramsHeader from "../../ProgramsHeader"
import {NAV_BUTTON_LINKS, NEW_PROGRAM} from "../../Constants";

class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            programData: {},
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

    render() {
        const { items = [], programData: { program_name } } = this.state
        const { location: { pathname } } = this.props
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
