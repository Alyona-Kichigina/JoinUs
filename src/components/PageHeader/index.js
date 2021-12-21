import React, {Component} from 'react';
import BreadCrumbs from "../Breadcrumbs"
import { NAV_BUTTON_LINKS } from "@Pages/programs/NewProgramm/Constants";
import NavContentBtn from "../NavContentButton";

class PageHeader extends Component {
    render() {
        const { pageData, section, children } = this.props
        return (
            <div className="h-full">
                <div>
                    <BreadCrumbs
                        section={section}
                        {...this.props}
                    />
                </div>
                <div className="flex mb-6 mt-4">
                    <div className="text-2xl font-bold">
                        { pageData.pageName }
                    </div>
                </div>
                <div
                    className="bg-white h-5/6"
                    style={{
                        "borderRadius": "4px",
                        "height": "90%"
                    }}
                >
                    <NavContentBtn
                        {...this.props}
                        links={NAV_BUTTON_LINKS}

                    />
                    {children}
                </div>
            </div>
        );
    }
}

export default PageHeader;
