import React, {Component} from 'react';
import "./style.css"
import { EditIcon, ArrowUP, Trash } from "../../../Constants";
import {ActionsForm} from "./style";

class Actions extends Component {
    render() {
        const { editButton, data, nestedLevel } = this.props
        return (
            <ActionsForm className="icon-container transition-icon cursor a-i-center flex">
                <div
                    onClick={() => editButton(data)}
                    className="edit-icon"
                    dangerouslySetInnerHTML={{__html: EditIcon}}
                />
                <div
                    className="flex a-i-center j-c-center ml-7"
                    style={!nestedLevel ? {"display": "none"} : {}}
                >
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
            </ActionsForm>
        );
    }
}

export default Actions;
