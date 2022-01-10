import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PageHeader from "../../components/PageHeader";
import {CONTENT_LINKS} from "../programs/Constants";


const pageData = {
    pageName: "Программа для разработчиков"
}

class BlocksPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blocks: []
        }
    }
    render() {
        const { props } = this
        return (
            <PageHeader
                {...props}
                pageData={pageData}
                url="programs"
                section="programs"
                links={CONTENT_LINKS}
            >
                <div>
                    BLOCKS BLOCKS BLOCKS BLOCKS
                    BLOCKS BLOCKS BLOCKS BLOCKS
                    BLOCKS BLOCKS BLOCKS BLOCKS
                    BLOCKS BLOCKS BLOCKS BLOCKS
                </div>
            </PageHeader>
        )
    }
}

BlocksPage.propTypes = {

};

export default BlocksPage;
