import React from 'react';
import PropTypes from 'prop-types';
import {Route} from "react-router-dom";
import General from "./General"
import levelStages from "./Stages";


const Stages = (props) => {
    return (
        <div>
            <Route path="/programs/:programName/stages/general" component={General}/>
            <Route path="/programs/:programName/stages/levelStages" component={levelStages}/>
        </div>
    );
};

Stages.propTypes = {

};

export default Stages;