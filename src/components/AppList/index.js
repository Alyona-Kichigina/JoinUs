import React, {Component} from 'react';
import Header from "./header";
import Row from "./row"

class AppList extends Component {
    render() {
        const { data, settings } = this.props

        const gridRowsSize = `${settings.map(a => a.size ? `${a.size}` : "auto")}`.replace(/,/gi, " ")
        const gridStyle = {
                 "grid-template-columns": gridRowsSize
             }

        const TableRows = (nestedKey) => {
            const result = []

            for (let i = 0; i < data.length; i++) {
                const rowData = data[i]
                const rowKey = settings[i].key

                result.push(
                    <div
                        key={rowKey}
                    >
                        {
                            <div>
                                <div className="bg-color-light-blue">
                                    <Row
                                        className="color-light-blue"
                                        settings={settings}
                                        data={rowData}
                                        gridStyle={gridStyle}
                                        rowClass="font-bold my-4 ml-4 flex justify-start"
                                    />
                                </div>
                                {
                                    rowData[nestedKey].map( a => (
                                        <Row
                                            settings={settings}
                                            data={a}
                                            gridStyle={gridStyle}
                                            rowClass="my-4 ml-8 flex justify-start font-semibold"
                                        />
                                    ))
                                }
                            </div>
                        }
                    </div>
                )
            }
            return result
        }

        return (
            <div>
                <Header
                    settings={settings}
                    gridStyle={gridStyle}
                />
                <div>
                    { TableRows("data") }
                </div>
            </div>
        );
    }
}

AppList.propTypes = {};

export default AppList;