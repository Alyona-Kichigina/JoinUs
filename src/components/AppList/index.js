import React, {Component} from 'react';
import Header from "./header";
import Row from "./row"

class AppList extends Component {
    render() {
        const { data, settings, nestedKey } = this.props

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
                                        rowIndex={i}
                                        gridStyle={gridStyle}
                                        rowClass="font-bold my-4 ml-4 flex justify-start"
                                    />
                                </div>
                                {
                                    nestedKey && rowData[nestedKey].map( (a, index) => {
                                        return (
                                        <Row
                                            settings={settings}
                                            data={a}
                                            nestedLevel={1}
                                            rowIndex={index}
                                            parentIndex={i}
                                            gridStyle={gridStyle}
                                            rowClass="my-4 flex justify-start font-semibold"
                                        />
                                    )})
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
                    { TableRows(nestedKey) }
                </div>
            </div>
        );
    }
}

AppList.propTypes = {};

export default AppList;