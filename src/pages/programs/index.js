import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from "../../components/PageHeader";
import { Route } from "react-router-dom"
import { STAGES_LINKS, NAV_BUTTON_LINKS } from "./Constants";
import Goals from "./Goals";
import Levels from "./levels";
import Contacts from "./Contacts";
import Documents from "./Documents";
import NewProgram from "./NewProgramm";
import ProgramsList from "./ProgramsList";
import General from "./Stages/General";
import levelStages from "./Stages/Stages";

const Programs = (props) => {
    const { location: { pathname } } = props
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
                            <Route exact path="/programs/:programName/stages/general" component={General} />
                            <Route path="/programs/:programName/stages/levelStages" component={levelStages}/>
                            <Route path="/programs/:programName/stages/programs" component={ProgramsList}/>
                        </PageHeader>
                    ) : (
                        <PageHeader
                            {...props}
                            pageData={{pageName: programName}}
                            url="programs"
                            links={NAV_BUTTON_LINKS}
                        >
                            <Route path="/programs/general" component={NewProgram}/>
                            <Route path="/programs/:programName/levels" component={Levels}/>
                            <Route path="/programs/:programName/contacts" component={Contacts}/>
                            <Route path="/programs/:programName/documents" component={Documents}/>
                            <Route path="/programs/:programName/goals" component={Goals}/>
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