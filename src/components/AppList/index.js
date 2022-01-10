import React, {Component} from 'react';
import Header from "./header";
import Row from "./row"
import PropTypes from "prop-types"
import ScrollBar from "@Components/ScrollBar"

// todo последний элемент в списке обрезается
// поправить верстку

class AppList extends Component {
    render() {
        const { data, settings, nestedKey, nestedData } = this.props

        const gridRowsSize = `${settings.map(a => a.size ? `${a.size}` : "auto")}`.replace(/,/gi, " ")
        const gridStyle = {"gridTemplateColumns": gridRowsSize}

        const TableRows = (nestedKey) => {
            const result = []
            for (let i = 0; i < data.length; i++) {
                const rowData = data[i]
                result.push(
                  <>
                    <div className={`${nestedData && "bg-color-light-blue"}`}>
                      <Row
                        className=""
                        key={i}
                        settings={settings}
                        data={rowData}
                        nestedLevel={0}
                        rowIndex={i}
                        nestedData={nestedData}
                        gridStyle={gridStyle}
                        rowClass="font-bold my-4 mx-4 flex justify-start"
                      />
                    </div>
                    {
                      nestedKey && rowData[nestedKey] && rowData[nestedKey].length > 0 && rowData[nestedKey].map( (a, index) => {
                        return (
                          <Row
                            settings={settings}
                            key={i}
                            data={a}
                            nestedLevel={1}
                            rowIndex={index}
                            parentIndex={i}
                            gridStyle={gridStyle}
                            rowClass="my-4 flex justify-start font-semibold"
                          />
                        )})
                    }
                  </>
                )
            }
            return result
        }

        return (
            <div className="bg-white flex-container border-radius-4 m-b-16 h-full m-b-16 hidden">
                <Header
                    settings={settings}
                    gridStyle={gridStyle}
                />
              <ScrollBar>
                  { TableRows(nestedKey) }
              </ScrollBar>
            </div>
        );
    }
}

AppList.propTypes = {
  data: PropTypes.array,
  settings: PropTypes.array,
  nestedKey: PropTypes.string,
};

AppList.defaultProps = {
  data: [],
  settings: [],
  nestedKey: ""
}

export default AppList;
