import React, {Component} from 'react';
// import Breadcrumbs from "../Breadcrumbs";
import BreadCrumbs from "../Breadcrumbs/bredCrumbs"
import {CONTENT_LINKS} from "../Constants";
import NavContentBtn from "../NavContentButton";

class PageHeader extends Component {
    render() {
        const { pageData } = this.props
        return (
            <div className="h-full">
                <div>
                    <BreadCrumbs
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
                        "border-radius": "4px",
                        "height": "90%"
                    }}
                >
                    <NavContentBtn
                        links={CONTENT_LINKS}

                    />
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default PageHeader;
