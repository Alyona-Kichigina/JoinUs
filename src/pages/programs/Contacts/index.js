import React, {Component} from 'react';
import PageHeader from "../../../components/PageHeader";
import AppList from "../../../components/AppList";
import {CONTENT_LINKS} from "../NewProgramm/Constants";


const pageData = {
    pageName: "Программа для разработчиков"
}

const data = [
    {
        value: {
            name: "Петрова Дарья",
            role: "Директор по техническому развитию"
        },
        role: "Наставник",
        contacts: {
            mail: "petrova.darya@gmail.com",
            phone: [
                "+7 999 787 7868"
            ]
        }
    },
    {
        value: {
            name: "Егоров Михаил",
            role: "Заместитель генерального директора по стратегическому развитию"
        },
        role: "HR",
        contacts: {
            mail: "petrova.darya@gmail.com",
            phone: [
                "+7 999 787 7868"
            ]
        }
    },
    {
        value: {
            name: "Петрова Дарья",
            role: "Директор по техническому развитию"
        },
        role: "Гуру",
        contacts: {
            mail: "petrova.darya@gmail.com",
            phone: [
                "+7 999 787 7868",
                "+7 999 787 7868"
            ]
        }
    },
]

const Contact = ({data}) => {
    return (
        <div className="flex ml-1.5 items-center">
            <div
                className="h-7 w-7 bg-color-green"
                style={{"border-radius": "50%"}}
            />
            <div className="flex flex-col ml-3 justify-center">
                <div className="flex j-c-start">
                    { data.name }
                </div>
                <div
                    className="flex j-c-start text-xs font-semibold color-light-blue-2"
                >
                    { data.role }
                </div>
            </div>
        </div>
    )
}

const ContactsComp = ({ data }) => {
    return  (
        <div>
            {
                data.phone && data.phone.map( a => (
                    <div className="flex j-c-start mb-1">
                        { a }
                    </div>
                ))
            }
            {
                data.mail && (
                    <div className="flex j-c-start text-xs font-semibold color-light-blue-2">
                        {data.mail}
                    </div>
                )
            }
        </div>
    )
}

const settings = [
    {
        id: 1,
        key: "number",
        name: "№",
        // component: Contact,
        size: "5%"
    },
    {
        id: 2,
        key: "value",
        name: "Контакт",
        component: Contact,
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
        component: ContactsComp,
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
        fetch(`http://localhost:9000/api/adaptationcontact`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        items: response
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
        const newData = items.map(({ last_name, first_name, post, role }) =>
            ({
                value: {
                    name: `${last_name} ${first_name}`,
                    role: `${post}`
                },
                role: `${role}`,
                contacts: {
                    mail: "petrova.darya@gmail.com",
                    phone: [
                        "+7 999 787 7868",
                        "+7 999 787 7868"
                    ]
                }
            })
        )
        // console.log("newData", newData)
        return (
            <div>
                <PageHeader
                {...this.props}
                url="programs"
                links={CONTENT_LINKS}
                pageData={pageData}
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
                </PageHeader>
            </div>
        );
    }
}

export default Contacts;
