import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { Route } from "react-router-dom"
import {CONTENT_LINKS} from "./Constants";
import Goals from "./Goals";
import Levels from "./levels";
import Contacts from "./Contacts";
import Documents from "./Documents";
import NewProgram from "./NewProgramm";
import ProgramsList from "./ProgramsList";


const pageData = {
    pageName: "Программа для разработчиков"
}

const Programs = (props) => {
    const { match: { path }, match, location: { pathname } } = props
    console.log(pathname, path, path === "/programs")
    return (
        <div>

            {
                pathname === "/programs" ?
                    (
                        <Route path="/programs" component={ProgramsList} />
                    ) : (
                        <PageHeader
                            {...props}
                            pageData={pageData}
                            url="programs"
                            links={CONTENT_LINKS}
                        >
                            <Route path="/programs/general" component={NewProgram}/>
                            <Route path="/programs/:programName/levels" component={Levels}/>
                            <Route path="/programs/:programName/contacts" component={Contacts}/>
                            <Route path="/programs/:programName/documents" component={Documents}/>
                            <Route path="/programs/:programName/goals" component={Goals}/>
                            <Route path="/programs/:programName/general" component={NewProgram}/>
                            <Route path="/programs/new_programm/general" component={NewProgram}/>
                            <Route path="/programs/levels" component={Levels}/>
                            <Route path="/programs/contacts" component={Contacts}/>
                            <Route path="/programs/documents" component={Documents}/>
                            <Route path="/programs/goals" component={Goals}/>
                        </PageHeader>
                )
            }
        </div>
    );
};

Programs.propTypes = {

};

export default Programs;