import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types"
import {ArrowBack} from "../../pages/Constants";
import { BreadcrumbsDot } from "./style";

const BreadCrumbs = ({location: { pathname }, bredCrumbsConfig}) => {
    const pathnames = pathname.split("/").filter(x => x)
    const pageName = pathnames[pathnames.length - 1]
    console.log(pageName)
    const { config } = bredCrumbsConfig.find(a => pageName === a.page)
    return (
        <div className="flex ls-02">
            {
                config.map(({name, link}, index) => {
                    const activeLink = config.length === index + 1
                    link = typeof link === "function" ? link(pathnames) : link
                    name = typeof name === "function" ? name(pathnames) : name
                    return (
                        <div
                            key={`${name}${index}`}
                            className="flex items-center">
                            {
                                !!index ? (
                                    <BreadcrumbsDot/>
                                ) : (
                                    <NavLink
                                        key={name}
                                        to={`${link}`}
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
