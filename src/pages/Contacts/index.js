import React, {Component} from 'react';
import PageHeader from "../../components/PageHeader";
import AppList from "../../components/AppList";
import {CONTENT_LINKS} from "../../components/Constants";
import {data, settings} from "./TableConfig";


const pageData = {
    pageName: "Программа для разработчиков"
}


// todo такой компонент уже есть
// это CardForUser
const Contact = ({data}) => {
    return (
        <div className="flex ml-1.5">
            <div
                className="h-7 w-7 bg-color-green"
                style={{"borderRadius": "50%"}}
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
