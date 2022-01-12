import React from 'react';
import Input from "@Components/Fields/Input"
import {ArrowUP, ArrowDown} from "../../pages/Constants";
import { Arrows } from "./style";
import PropTypes from 'prop-types';

const ArrowInput = props => {
    const { value, arrowUp, arrowDown } = props
    return (
        <div className="flex">
            <Input
                {...props}
            />
            <Arrows className="flex">
                <div
                    onClick={arrowUp}
                    className="flex items-center cursor color-red"
                    dangerouslySetInnerHTML={{__html: ArrowDown}}
                />
                <div
                    onClick={arrowDown}
                    className="flex items-center cursor arrow-down"
                    dangerouslySetInnerHTML={{__html: ArrowUP}}
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