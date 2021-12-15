import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { CONTENT_LINKS } from "../../pages/programs/NewProgramm/Constants";

class Breadcrumbs extends Component {
    render() {
        const { history } = this.props
        const path = history.location.pathname.split("/")
        path.shift()
        // const linkName = (a) => CONTENT_LINKS.find((e) => {
        //     // console.log("e", e.link,"a", a, e === a )
        //     if (e.link === a) {
        //         return e
        //     }
        // })
        const linkName = (a) => CONTENT_LINKS.find((e) => {
            // console.log("e", e.link,"a", a, e === a )
            console.log(path)
            if (e.link === a) {
                return e
            }
        })

        return (
            <div className="flex">
                {
                    path.map( (a, index) => {
                    return (
                    <div className="pr-3 capitalize">
                        <Link
                            className={path.length !== index + 1 ? "text-gray-400" : ""}
                            to={a}
                        >
                            {`${a}`}
                        </Link>
                    </div>
                )}) }
            </div>
        );
    }
}

Breadcrumbs.propTypes = {};

export default Breadcrumbs;
