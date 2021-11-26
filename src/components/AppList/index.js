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

            console.log(data)

            for (let i = 0; i < data.length; i++) {
                const rowData = data[i]
                const rowKey = settings.key
                // console.log(nestedKey)
                // console.log(i, settings.map( a => data[i]))
                // console.log(i, settings.map( a => data[i][a.key]))
                result.push(
                    <div
                        key={rowKey}
                    >
                        {
                            settings.map( a => (
                                <div>
                                    <div
                                        className="grid"
                                        style={gridStyle}
                                    >
                                        <div>
                                            { console.log(i, data[i][a.key]) }
                                            { console.log(i, data[i][nestedKey]) }
                                            { data[i][a.key] }
                                        </div>
                                    </div>
                                    {/*{*/}
                                    {/*    data[i][a.key][nestedKey] ? (*/}
                                    {/*        <div>*/}
                                    {/*            <div*/}
                                    {/*                className="grid"*/}
                                    {/*                style={gridStyle}*/}
                                    {/*            >*/}
                                    {/*                <div>*/}
                                    {/*                    { data[i][a.key] }*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    ) : ("")*/}
                                    {/*}*/}

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
                    { TableRows("data") }
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