import React, {Component} from 'react';
import Breadcrumbs from "../Breadcrumbs";
import NavContentBtn from "../NavContentButton";

class PageHeader extends Component {
    render() {
        const { pageData } = this.props
        return (
            <div>
              <Breadcrumbs
                {...this.props}
              />
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
                      {...this.props}
                    />
                  <div
                    className="bg-white flex-container"
                  >
                    {this.props.children}
                  </div>
                </div>
            </div>
        );
    }
}

export default PageHeader;
