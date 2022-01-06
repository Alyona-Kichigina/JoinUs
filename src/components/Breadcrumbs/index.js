import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { CONTENT_LINKS } from "../../pages/programs/Constants";
import PropTypes from "prop-types"
import {ArrowBack} from "../../pages/Constants";
import { BreadcrumbsDot } from "./style";

const BreadCrumbs = props => {
    const { location: { pathname }, section } = props
    const pathnames = pathname.split("/").filter(x => x)
    const newPath = CONTENT_LINKS.filter(a => pathnames.some(e => e === a.link))
    return (
        <div className="flex ls-02">
            {
                newPath.map(({name, link}, index) => {
                    // console.log(link)
                    const activeLink = newPath.length === index + 1
                    return (
                        <div
                            // key={name}
                            className="flex items-center">
                            {
                                !!index ? (
                                    <BreadcrumbsDot/>
                                ) : (
                                    <NavLink
                                        key={name}
                                        to={`${newPath[0].link}`}
                                    >
                                        <div
                                            className="mr-3"
                                            dangerouslySetInnerHTML={{__html: ArrowBack}}
                                        />
                                    </NavLink>
                                )
                            }
                            <NavLink
                                to={`/${section}/${link}`}
                                className={`${activeLink ? "pointer-events-none" : "color-light-blue-2"} capitalize`}
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

BreadCrumbs.propTypes ={
    location: PropTypes.object,
}

export default withRouter(BreadCrumbs)
