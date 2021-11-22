import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AppList extends Component {
    render() {
        const { data, settings } = this.props
        return (
            <div>
                {
                    settings.map(a => (
                        <div>

                        </div>
                    ))
                }
            </div>
        );
    }
}

AppList.propTypes = {};

export default AppList;