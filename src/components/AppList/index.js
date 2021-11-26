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

        const TableRows = () => {
            const result = []

            // console.log("DATA", data)

            for (let i = 0; i < data.length; i++) {
                const rowData = data[i]
                const rowKey = settings.key
                console.log("rowKey", rowKey)
                console.log("rowData", rowData)
                result.push(
                    <div
                        key={rowKey}
                    >
                        {
                            settings.map( a => (
                                <div
                                    className="grid"
                                    style={gridStyle}
                                >
                                    { data[i][a.key] }
                                </div>
                            ))
                        }

                        {/*{ rowKey ? rowData[rowKey] : "" }*/}
                    </div>
                    // <Row
                    //     data={rowData}
                    //     rowKey={rowKey}
                    // />
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
                    { TableRows() }
                    {/*{*/}
                    {/*    settings.map( (a, index) => (*/}
                    {/*        <div>*/}
                    {/*            */}
                    {/*        </div>*/}
                    {/*    ))*/}
                    {/*}*/}
                </div>
            </div>
        );
    }
}

AppList.propTypes = {};

export default AppList;