import React, {Component} from 'react';
import NavContentBtn from "../../components/NavContentButton";
import { CONTENT_LINKS } from "../../components/Constants"
import Breadcrumbs from "../../components/Breadcrumbs";

const pageData = {
    pageName: "Программа для разработчиков"
}

class Levels extends Component {
    render() {
        const { history } = this.props
        return (
            <div className="h-full">
                <div>
                    <div>
                        <Breadcrumbs
                            {...this.props}
                        />
                    </div>
                    <div className="flex justify-between mb-6 mt-4">
                        <div>
                            { pageData.pageName }
                        </div>
                    </div>
                    <div>
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
                </div>
            </div>
        );
    }
}

Levels.propTypes = {};

export default Levels;