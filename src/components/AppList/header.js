import React, {Component} from 'react';

class Header extends Component {
    render() {
        const { settings, gridStyle } = this.props

        return (
            <div
                className="grid"
                style={gridStyle}>
                {
                    settings.map( a => (
                        <div className="my-4">
                            { a.name }
                        </div>
                    ))
                }
            </div>
        );
    }
}

Header.propTypes = {};

export default Header;