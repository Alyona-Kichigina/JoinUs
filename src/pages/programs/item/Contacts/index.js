import React, {Component} from 'react';
import AppList from "../../../../components/AppList";
import {DEFAULT_URL, ADAPTATION_CONTACTS} from "../../../../components/APIList";
import CardForUser from "../../../../components/ComponentsForListTable/CardForUser";
import CardContact from "../../../../components/ComponentsForListTable/CardContact";
import axios from "axios";

const settings = [
    {
        id: 1,
        key: "number",
        name: "№",
        size: "5%"
    },
    {
        id: 2,
        key: "value",
        name: "Контакт",
        component: CardForUser,
        size: "45%"
    },
    {
        id: 3,
        key: "role",
        name: "Роль",
        size: "30%"
    },
    {
        id: 4,
        key: "contacts",
        name: "Контакты",
        component: CardContact,
        size: "30%"
    }
]

class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoaded: false,
            items: []
        }
    }
    componentDidMount() {
        axios.get(`${DEFAULT_URL}/${ADAPTATION_CONTACTS}`)
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        items: response.data
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
        const { items = [] } = this.state
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
        return (
            <div>
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
            </div>
        );
    }
}

export default Contacts;
