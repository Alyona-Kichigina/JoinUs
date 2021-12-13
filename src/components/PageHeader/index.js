import React, {Component} from 'react';
import Breadcrumbs from "../Breadcrumbs";
import {CONTENT_LINKS} from "../Constants";
import NavContentBtn from "../NavContentButton";

class PageHeader extends Component {
    render() {
        const { pageData } = this.props
        return (
            <div>
                <div>
                    <Breadcrumbs
                        {...this.props}
                    />
                </div>
                <div className="flex mb-6 mt-4">
                    <div className="text-2xl font-bold">
                        { pageData.pageName }
                    </div>
                </div>
                <div
                    className="bg-white"
                    style={{"borderRadius": "4px"}}
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
