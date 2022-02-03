import React, {Component} from 'react';
import BreadCrumbs from "../../../../src/components/Breadcrumbs"
import NavContentBtn from "../../../components/NavContentButton";

class PageHeader extends Component {
    render() {
        const { pageData, section, children, links, bredCrumbsConfig } = this.props
        return (
            <div className="flex-container">
                <BreadCrumbs
                    bredCrumbsConfig={bredCrumbsConfig}
                    section={section}
                    {...this.props}
                />
                <div className="flex mb-6 mt-4">
                    <div
                        className="text-2xl font-bold"
                        style={{"min-height": "28px"}}
                    >
                        { pageData }
                    </div>
                </div>
                <div
                    className="bg-white flex-container hidden m-b-24 p-b-24"
                    style={{"borderRadius": "4px"}}
                >
                    <NavContentBtn
                        {...this.props}
                        links={links}
                    />
                    {children}
                </div>
            </div>
        );
    }
}

export default PageHeader;
