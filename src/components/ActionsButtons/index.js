import React from 'react';
import PropTypes from 'prop-types';
import {ArrowUP, EditIcon, Trash} from "../../pages/Constants";

const ActionsButtons = ({handleEdit, data, dataKey, arrowUp, arrowDown}) => {
    const iconColor = data[dataKey] <= 1 ? "0.3" : ""
    return (
        <div>
            <div className="icon-container transition-icon cursor items-center j-c-center flex">
                <div
                    className="edit-icon"
                    onClick={() => handleEdit(data)}
                    dangerouslySetInnerHTML={{__html: EditIcon}}
                />
                <div className="flex a-i-center j-c-center ml-7">
                    <div
                        className="arrow-icon"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                    <div
                        style={{"fill": "var(--color-light-blue-2)", "opacity": iconColor}}
                        className="arrow-icon arrow-down"
                        dangerouslySetInnerHTML={{__html: ArrowUP}}
                    />
                </div>
                <div
                    className="trash-icon ml-7"
                    dangerouslySetInnerHTML={{__html: Trash}}
                />
            </div>
        </div>
    );
};

ActionsButtons.propTypes = {
    handleEdit: PropTypes.func,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array,])
};

export default ActionsButtons;