import React, {Component} from 'react';
import Router from "../Router"

class NavContent extends Component {
    render() {
        return (
            <div
                className="p-l-32 p-t-24 p-r-32 flex-container hidden"
                style={{"borderRadius": "4px"}}
            >
                <Router />
            </div>
        );
    }
}

export default NavContent;
