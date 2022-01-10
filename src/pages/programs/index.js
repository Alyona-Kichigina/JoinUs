import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from "../../components/PageHeader";
import { Route } from "react-router-dom"
import {NAV_BUTTON_LINKS, STAGES_LINKS} from "./Constants";
import Goals from "./item/Goals";
import Levels from "./item/levels";
import Contacts from "./item/Contacts";
import Documents from "./item/Documents";
import NewProgram from "./item/General";
import ProgramsList from "./list/ProgramsList";
import General from "../Employees/item/General";
import levelStages from "./Stages/Stages";

const Programs = (props) => {
    const { match: { path }, match, location: { pathname } } = props
    const pathnames = pathname.split("/").filter(x => x)
    const programName = pathnames[1] === "new_programm" ? "Новая программа"  : pathnames[1]
    return (
        <div>
            {
                pathname === "/programs" ?
                    (
                        <Route path="/programs" component={ProgramsList} />
                    ) : pathnames[2] === "stages" ? (
                        <PageHeader
                            {...props}
                            pageData={{pageName: programName}}
                            url="programs"
                            links={STAGES_LINKS}
                        >
                            <Route exact path="/programs/:programName/:programID/stages/general" component={General} />
                            <Route path="/programs/:programName/:programID/stages/levelStages" component={levelStages}/>
                            <Route path="/programs/:programName/:programID/stages/programs" component={ProgramsList}/>
                        </PageHeader>
                    ) : (
                        <PageHeader
                            {...props}
                            pageData={{pageName: programName}}
                            url="programs"
                            links={NAV_BUTTON_LINKS}
                        >
                            <Route path="/programs/general" component={NewProgram}/>
                            <Route path="/programs/:programName/:programID/levels" component={Levels}/>
                            <Route path="/programs/:programName/:programID/contacts" component={Contacts}/>
                            <Route path="/programs/:programName/:programID/documents" component={Documents}/>
                            <Route path="/programs/:programName/:programID/goals" component={Goals}/>
                            <Route path="/programs/:programName/:programID/general" component={NewProgram}/>
                            <Route path="/programs/:programName/general" component={NewProgram}/>
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
    location: PropTypes.object,
};

export default Programs;
