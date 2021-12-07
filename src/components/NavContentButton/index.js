import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { NavLink, useRouteMatch  } from "react-router-dom"


export default function NavContentBtn(props) {
    // path = useRouteMatch()
    const { links } = props
    let  match = useRouteMatch()

    console.log(match)
    return  (
            <div
                className="bg-white"
                style={{"border-radius": "4px 4px 0 0"}}
            >
                <div className="flex flex-1">
                    {
                        links.map( a => (
                            <Link
                                className="ml-8 mt-2 mb-1.5"
                                // to={`${match.url}/${a.link}`}
                                to={`/programs/${a.link}`}
                            >
                                { a.name }
                            </Link>
                        ))
                    }
                </div>
                <div className="w-full h-px bg-gray-300" />
            </div>
    )
}

// export default NavContentBtn;