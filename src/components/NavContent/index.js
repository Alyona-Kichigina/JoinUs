import React, {Component} from 'react';
import { Link } from "react-router-dom"
import Router from "../Router"

const links = [
    {
        name: "общие",
        link: "/"
    },
    {
        name: "уровни",
        link: "levels"
    },
    {
        name: "программы",
        link: "programs"
    },
    {
        name: "контакты",
        link: "контакты"
    },
    {
        name: "документы",
        link: "документы"
    },
    {
        name: "цели",
        link: "цели"
    }
]

class NavContent extends Component {
    render() {
        return (
            <div className="mx-8 mt-6 h-full bg-white">
                <div className="flex flex-1">
                    {
                        links.map( a => (
                         <Link
                             className="ml-8 mt-2 mb-1.5"
                             to={a.link}
                         >
                             { a.name }
                         </Link>
                        ))
                    }
                </div>
                <div className="w-full h-px bg-gray-300" />
                <Router />
            </div>
        );
    }
}

NavContent.propTypes = {};

export default NavContent;
