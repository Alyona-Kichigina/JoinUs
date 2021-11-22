import React, {Component} from 'react';
import NavContentBtn from "../../components/NavContentButton";
import { CONTENT_LINKS } from "../../components/Constants"

class Levels extends Component {
    render() {
        return (
            <div className="h-full">
                <NavContentBtn
                    links={CONTENT_LINKS}

                />
                 <div className="bg-white h-full">
                     Levels Levels Levels Levels Levels Levels Levels
                     Levels Levels Levels Levels Levels Levels Levels
                     Levels Levels Levels Levels Levels Levels Levels
                     Levels Levels Levels Levels Levels Levels Levels
                     Levels Levels Levels Levels Levels Levels Levels
                     Levels Levels Levels Levels Levels Levels Levels
                     Levels Levels Levels Levels Levels Levels Levels
                     Levels Levels Levels Levels Levels Levels Levels
                     Levels Levels Levels Levels Levels Levels Levels
                     Levels Levels Levels Levels Levels Levels Levels
                 </div>
            </div>
        );
    }
}

Levels.propTypes = {};

export default Levels;