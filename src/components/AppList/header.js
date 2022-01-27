import React, {Component} from 'react';
import { HeaderContainer } from "./style"

class Header extends Component {
    render() {
        const { settings, gridStyle } = this.props

        return (
            <HeaderContainer
                className="grid color-light-blue-2"
                style={gridStyle}>
                {
                    settings.map(({name, key}, index) => (
                        <div
                          className="my-4 flex justify-start mx-4 fs-14"
                          key={index}
                        >
                            { name }
                        </div>
                    ))
                }
            </HeaderContainer>
        );
    }
}

Header.propTypes = {};

export default Header;