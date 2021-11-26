import React, {Component} from 'react';
import { Link } from "react-router-dom";

class Breadcrumbs extends Component {
    render() {
        const { history } = this.props
        const path = history.location.pathname.split("/")
        path.shift()
        return (
            <div className="flex">
                { path.map( (a, index) => (
                    <div className="pr-3 capitalize">
                     <Link
                         className={path.length !== index +1 ? "text-gray-400" : ""}
                         to={a}
                     >
                         { a }
                     </Link>
                    </div>
                )) }
            </div>
        );
    }
}

Breadcrumbs.propTypes = {};

export default Breadcrumbs;