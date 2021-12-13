import React from 'react';
import {Link, NavLink} from "react-router-dom";
import { NawContentBtn, NawContentItem } from "./style"

export default function NavContentBtn(props) {
    const { links } = props

    return  (
            <div
                className="bg-white"
                style={{"border-radius": "4px 4px 0 0"}}
            >
                <NawContentBtn className="flex flex-1 pt-4 pb-4">
                    {
                        links.map( a => (
                            <NawContentItem>
                                <NavLink
                                    className="ml-8 h-full font-semibold capitalize"
                                    to={`/programs/${a.link}`}
                                >
                                    { a.name }
                                </NavLink>
                            </NawContentItem>
                        ))
                    }
                </NawContentBtn>
                <div className="w-full h-px bg-gray-300" />
            </div>
    )
}

// export default NavContentBtn;