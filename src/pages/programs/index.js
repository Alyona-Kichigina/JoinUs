import React from 'react';
import PropTypes from 'prop-types';
import { Route } from "react-router-dom"
import Goals from "./item/Goals";
import Levels from "./item/levels";
import Contacts from "./item/Contacts";
import Documents from "./item/Documents";
import NewProgram from "./item/General";
import ProgramsList from "./list/ProgramsList";
import LevelsGeneral from "../../pages/programs/Stages/General";
import levelStages from "./Stages/Stages";
import StagesGeneral from "./Levels/General"
import LevelsProgramsList from "./Stages/ProgramsList"
import Blocks from "./Levels/Blocks"
import LevelsList from "./Levels/LevelsList"
import {NEW_PROGRAM} from "./Constants";

const Programs = (props) => {
    const { location: { pathname } } = props
    const pathnames = pathname.split("/").filter(x => x)

    return (
        <div className="flex-container">
            {
                pathname === "/programs"
                  ?
                    (
                        <Route path="/programs" component={ProgramsList} />
                    )
                  : pathnames[3] === "level" || pathnames[4] ==="level"
                  ? (
                        <>
                            <Route path="/programs/:programName/:programID/:levelID/level/general" component={LevelsGeneral} />
                            <Route path="/programs/:programName/:programID/:levelID/level/levelStages" component={levelStages}/>
                            <Route path="/programs/:programName/:programID/:levelID/level/programs" component={LevelsProgramsList}/>
                            <Route path="/programs/:programName/:programID/level/general" component={LevelsGeneral} />
                            <Route path="/programs/:programName/:programID/level/levelStages" component={levelStages}/>
                            <Route path="/programs/:programName/:programID/level/programs" component={LevelsProgramsList}/>
                            <Route path="/programs/:programName/level/general" component={LevelsGeneral} />
                            <Route path="/programs/:programName/level/levelStages" component={levelStages}/>
                            <Route path="/programs/:programName/level/programs" component={LevelsProgramsList}/>
                            <Route path="/programs/new_program/level/New_level" component={LevelsGeneral}/>
                        </>
                    ) : pathnames[4] ==="stage" ? (
                        // <PageHeader
                        //     {...props}
                        //     bredCrumbsConfig={levelsBreadcrumbs}
                        //     pageData={programName}
                        //     url="programs"
                        //     links={STAGES_LINKS}
                        // >
                        <>
                            <Route path="/programs/:programName/:programID/:stageID/stage/general" component={StagesGeneral} />
                            <Route path="/programs/:programName/:programID/:stageID/stage/blocks" component={Blocks} />
                            <Route path="/programs/:programName/:programID/:stageID/stage/levels" component={LevelsList} />
                         {/*</PageHeader>*/}
                        </>
                    ) : (
                        <>
                            <Route path="/programs/general" component={NewProgram}/>
                            <Route path="/programs/:programName/:programID/levels" component={Levels}/>
                            <Route path="/programs/:programName/:programID/contacts" component={Contacts}/>
                            <Route path="/programs/:programName/:programID/documents" component={Documents}/>
                            <Route path="/programs/:programName/:programID/goals" component={Goals}/>
                            <Route path="/programs/:programName/:programID/general" component={NewProgram}/>
                            <Route path="/programs/:programName/general" component={NewProgram}/>
                            <Route path="/programs/new_program/levels" component={Levels}/>
                            <Route path="/programs/new_program/contacts" component={Contacts}/>
                            <Route path="/programs/new_program/documents" component={Documents}/>
                            <Route path="/programs/new_program/goals" component={Goals}/>
                        </>
                )
            }
        </div>
    );
};

Programs.propTypes = {
    location: PropTypes.object,
};

export default Programs;
