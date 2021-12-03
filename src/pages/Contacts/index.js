import React, {Component} from 'react';
import PageHeader from "../../components/PageHeader";
import AppList from "../../components/AppList";
import NavContentBtn from "../../components/NavContentButton";
import {CONTENT_LINKS} from "../../components/Constants";


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
        <div className="flex ml-1.5">
            <div
                className="h-7 w-7 bg-color-green"
                style={{"border-radius": "50%"}}
            />
            <div className="flex fd-column ml-3">
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

const ContactsComp = ({data}) => {
    return (
        <div>
            {
                data.phone.map( a => (
                    <div className="flex j-c-start mb-1">
                        { a }
                    </div>
                ))
            }
            <div className="flex j-c-start text-xs font-semibold color-light-blue-2">
                { data.mail }
            </div>
        </div>
    )
}

const settings = [
    {
        id: 1,
        key: "value",
        name: "Контакт",
        component: Contact,
        size: "50%"
    },
    {
        id: 2,
        key: "role",
        name: "Роль",
        size: "30%"
    },
    {
        id: 3,
        key: "contacts",
        name: "Контакты",
        component: ContactsComp,
        size: "30%"
    }
]

class Contacts extends Component {
    render() {
        return (
            <div>
                <PageHeader
                {...this.props}
                pageData={pageData}
                 >
                     <div>

                     </div>
                     <div>
                         CONTACTS CONTACTS CONTACTS
                         CONTACTS CONTACTS CONTACTS
                         CONTACTS CONTACTS CONTACTS
                         CONTACTS CONTACTS CONTACTS
                     </div>
                     <div>
                         <AppList
                             settings={settings}
                             data={data}
                         />
                     </div>
                </PageHeader>
            </div>
        );
    }
}

export default Contacts;