import React from 'react';
import {NavLink} from "react-router-dom";
import { NawContentBtn, NawContentItem } from "./style"

export default function NavContentBtn(props) {
    const { links } = props
    const { location: { pathname } } = props
    const pathnames = pathname.split("/").filter(x => x)
    const path = pathnames.slice(0, pathnames.length - 1).join("/")
    return  (
            <div
                className="bg-white"
                style={{"borderRadius": "4px 4px 0 0"}}
            >
                <NawContentBtn className="flex flex-1 pt-4 pb-4">
                    {
                        links.map( a => (
                            <NawContentItem>
                                <NavLink
                                    key={a.name}
                                    className="h-full"
                                    to={`/${path}/${a.link}`}
                                >
                                    {a.name}
                                </NavLink>
                            </NawContentItem>
                        ))
                    }
                </NawContentBtn>
            </div>
    )
}
