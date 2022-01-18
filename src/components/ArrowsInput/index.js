import React from 'react';
import Input from "@Components/Fields/Input"
import {SmallArrowUp} from "../../pages/Constants";
import { Arrows } from "./style";
import PropTypes from 'prop-types';

const ArrowInput = props => {
    const { value, arrowUp, arrowDown } = props
    const iconColor = value <= 1 ? "0.3" : ""
    return (
        <div className="flex">
            <Input
                {...props}
            />
            <Arrows className="flex">
                <div
                    onClick={arrowUp}
                    style={{"fill": "var(--color-light-blue-2)"}}
                    className="flex items-center cursor color-red"
                    dangerouslySetInnerHTML={{__html: SmallArrowUp}}
                />
                <div
                    onClick={arrowDown}
                    style={{"fill": "var(--color-light-blue-2)", "opacity": iconColor}}
                    className="flex items-center cursor arrow-down"
                    dangerouslySetInnerHTML={{__html: SmallArrowUp}}
                />
            </Arrows>
        </div>
    );
};

ArrowInput.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    arrowUp: PropTypes.func,
    arrowDown: PropTypes.func,
};

export default ArrowInput;