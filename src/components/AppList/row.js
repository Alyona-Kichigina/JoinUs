import React, {Component} from 'react';

class Row extends Component {
    render() {
        const {rowKey, settings, rowClass, gridStyle, nestedLevel, rowIndex, parentIndex, data = []  } = this.props

        return (
            <div
                className="grid"
                style={gridStyle}
                key={rowKey}
            >
                {
                    settings.map( (a, index) => {
                        const renderLevel = a.nestedLevel ? nestedLevel === a.nestedLevel : true
                        const Comp = a.component ? a.component : "div"
                    return (
                             <div
                                 className={`${rowClass} ${nestedLevel > 0 && index === 0 ? "ml-8" : "ml-4"}`}
                             >
                                 <div className="flex a-i-center">
                                      {
                                         index === 0 &&
                                             (<div className="mr-1">
                                                 { `${ parentIndex || parentIndex === 0 ? `${parentIndex + 1 }.${ rowIndex + 1}` : rowIndex + 1 }.` }
                                             </div>)
                                      }
                                      {
                                          renderLevel &&
                                          (<Comp
                                              data={data[a.key]}
                                              nestedLevel={nestedLevel}
                                              rowIndex={rowIndex}
                                          >
                                              {data[a.key]}
                                          </Comp>)
                                      }
                                 </div>
                             </div>
                            )
                    })
                }
            </div>
        );
    }
}

export default Row;