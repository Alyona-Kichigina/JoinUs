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
                    settings.map(({name, key}) => (
                        <div
                          className="my-4 flex justify-start mx-4"
                          key={key}
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
