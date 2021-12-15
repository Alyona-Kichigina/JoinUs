import React from 'react';
import { FormContainer } from "../NewProgramm/style";
import PropTypes from 'prop-types';

const Index = ({ settings }) => {
    console.log(settings)
    return (
        <div>
            <FormContainer>
                {
                    settings[1].map(({ Component, props, id, key, name }) => {
                        return (
                            // <Component />
                             <div>
                                 <span className="color-light-blue-2">
                                     { name }
                                 </span>
                                 <Component
                                     {...props}
                                     id={id}
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

Index.propTypes = {

};

export default Index;