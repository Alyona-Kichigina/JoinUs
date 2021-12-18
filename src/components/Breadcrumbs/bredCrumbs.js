import React from "react";
import { NavLink, useRouteMatch, withRouter } from "react-router-dom";
import { CONTENT_LINKS } from "../Constants";
import {ArrowBack} from "../../pages/Constants";
import { BreadcrumbsDot } from "./style";

const BreadCrumbs = props => {
    const {
        history,
        location: { pathname }
    } = props
    const pathnames = pathname.split("/").filter(x => x)
    const newPath = CONTENT_LINKS.filter(a => pathnames.some(e => e === a.link))
    console.log("newPath", newPath)
    console.log("pathname", pathname)
    return (
        <div className="flex">
            {
                newPath.map(({name, link}, index) => {
                    console.log(name, link)
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
                    return (
                        <div className="flex items-center">
                            {
                                !!index ? (
                                    <BreadcrumbsDot
                                        className="ml-4"
                                    />
                                ) : (
                                    <NavLink
                                        to={`/${newPath[0].link}`}
                                    >
                                        <div
                                            className="mr-3"
                                            dangerouslySetInnerHTML={{__html: ArrowBack}}
                                        />
                                    </NavLink>
                                )
                            }
                            <NavLink
                                to={`/${link}`}
                                className={`${!index && "color-light-blue-2"} capitalize`}
                            >
                                {name}
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default withRouter(BreadCrumbs)