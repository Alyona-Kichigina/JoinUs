import React from 'react';
import { FormContainer } from "../NewProgramm/style";
import PropTypes from 'prop-types';

const InputForm = ({ settings, state, onInput }) => {
    return (
        <div className="flex justify-around">
            <FormContainer>
                {
                    settings[1].map(({ Component, props, id, key, name, className, style }, index) => {
                        return (
                             <div className={`${index && "mt-4"}`}>
                                 <span className="color-light-blue-2 capitalize">
                                     { name }
                                 </span>
                                 <Component
                                     style={style}
                                     className
                                     {...props}
                                     id={key}
                                     onInput={onInput}
                                     value={state[key]}
                                     key={key}
                                 />
                             </div>
                        )
                    })
                }
            </FormContainer>
            <FormContainer>
                {
                    settings[2].map(({ Component, props, id, key, name, className, style }, index) => {
                        return (
                            <div className={`${index && "mt-4"}`}>
                                 <span className="color-light-blue-2 capitalize">
                                     { name }
                                 </span>
                                <Component
                                    style={style}
                                    className
                                    {...props}
                                    id={key}
                                    onInput={onInput}
                                    value={state[key]}
                                    key={key}
                                />
                            </div>
                        )
                    })
                }
            </FormContainer>
        </div>
    );
};

InputForm.propTypes = {

};

export default InputForm;