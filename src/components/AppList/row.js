import React, {Component} from 'react';

class Row extends Component {
    render() {
        const {rowKey, settings, rowClass, gridStyle, data = []  } = this.props
        return (
            <div
                className="grid"
                style={gridStyle}
                key={rowKey}
            >
                {
                    settings.map( a => (
                        <div
                            className={`${rowClass}`}
                        >
                            { data[a.key] }
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Row;