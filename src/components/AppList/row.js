import React, {Component} from 'react';

class Row extends Component {
    render() {
        const {rowKey, data = []  } = this.props
        return (
            <div
                key={rowKey}
            >
                { rowKey ? data[rowKey] : "" }
            </div>
        );
    }
}

export default Row;