import React, {Component} from 'react';
import { Link } from "react-router-dom"
import Router from "../Router"
import NavContentBtn from "../../components/NavContentButton";


class NavContent extends Component {
    render() {
        return (
            <div
                className="p-l-32 p-t-24 p-r-32 h-full"
                style={{"border-radius": "4px"}}
            >
                <Router />
            </div>
        );
    }
}

export default NavContent;
