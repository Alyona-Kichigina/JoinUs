import React, {Component} from 'react';
import { Link } from "react-router-dom"
import Router from "../Router"
import NavContentBtn from "../../components/NavContentButton";


class NavContent extends Component {
    render() {
        return (
            <div
                className="mx-8 mt-6 h-full"
                style={{"border-radius": "4px"}}
            >
                {/*<NavContentBtn*/}
                {/*    links={links}*/}
                {/*    className="bg-white"*/}
                {/*/>*/}
                <Router />
            </div>
        );
    }
}

export default NavContent;