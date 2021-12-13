import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageHeader from "../../components/PageHeader";

const pageData = {
    pageName: "Новая программа"
}

class NewProgramm extends Component {
    render() {
        return (
            <div>
                <PageHeader
                    {...this.props}
                    pageData={pageData}
                >
                    wqopkepqow
                </PageHeader>
            </div>
        );
    }
}

NewProgramm.propTypes = {};

export default NewProgramm;