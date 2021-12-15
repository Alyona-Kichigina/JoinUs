import React, {Component} from 'react';
import "./style.css"
import { EditIcon, ArrowUP, ArrowDown, Trash } from "../../Constants";

class Actions extends Component {
    render() {
        return (
            <div className="icon-container transition-icon cursor a-i-center j-c-center flex">
                <div
                    className="edit-icon"
                    dangerouslySetInnerHTML={{__html: EditIcon}}
                />
                <div className="flex a-i-center j-c-center ml-7">
                    <div
                        className="arrow-icon"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                    <div
                        className="arrow-icon arrow-down"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                </div>
                <div
                    className="trash-icon ml-7"
                    dangerouslySetInnerHTML={{__html: Trash}}
                />
            </div>
        );
    }
}

export default Actions;