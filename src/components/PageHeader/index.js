import React, {Component} from 'react';
import BreadCrumbs from "../Breadcrumbs"
import NavContentBtn from "../NavContentButton";

class PageHeader extends Component {
    render() {
        const { pageData, section, children, links } = this.props
        return (
            <div className="h-full flex-container">
              <BreadCrumbs
                section={section}
                {...this.props}
              />
                <div className="flex mb-6 mt-4">
                    <div className="text-2xl font-bold">
                        { pageData.pageName }
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
