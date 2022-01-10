import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input from "@Components/Fields/Input"
import {SmallArrow} from "../../pages/Constants";

class ModalSelectInput extends Component {
    render() {
        const { props } = this
        const { toggleModal, id, key, value } = props
        return (
            <div
                onClick={() => toggleModal}
            >
                <Input
                    disabled
                    value={value}
                    id={id}
                    key={key}
                    {...props}
                >
                    <div
                        onClick={toggleModal}
                        className="flex items-center pr-3 cursor"
                        dangerouslySetInnerHTML={{__html: SmallArrow}}
                    />
                </Input>
            </div>
        );
    }
}

ModalSelectInput.propTypes = {
    toggleModal: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object, PropTypes.array]),
};

export default ModalSelectInput;