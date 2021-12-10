import React, {Component} from 'react';
import {Link} from "react-router-dom";

// const links = [
//     {
//         name: "общие",
//         link: "/"
//     },
//     {
//         name: "уровни",
//         link: "levels"
//     },
//     {
//         name: "программы",
//         link: "programs"
//     },
//     {
//         name: "контакты",
//         link: "контакты"
//     },
//     {
//         name: "документы",
//         link: "документы"
//     },
//     {
//         name: "цели",
//         link: "цели"
//     }
// ]

class NavContentBtn extends Component {
    render() {
        const { links } = this.props
        return (
            <div
                className="bg-white"
                style={{"borderRadius": "4px 4px 0 0"}}
            >
                <div className="flex flex-1">
                    {
                        links.map( ({link, name, id}) => (
                            <Link
                              key={id}
                                className="ml-8 mt-2 mb-1.5"
                                to={link}
                            >
                                { name }
                            </Link>
                        ))
                    }
                </div>
                <div className="w-full h-px bg-gray-300" />
            </div>
        );
    }
}

export default NavContentBtn;
