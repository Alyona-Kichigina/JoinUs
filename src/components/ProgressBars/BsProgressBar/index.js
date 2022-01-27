import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { LineContainer, ProgressLine } from "./styles"

const BsProgressbar = React.forwardRef(({ children, percentage, customStyles }, ref) => {
  const getElementStyles = useMemo(
    () => customStyles || { width: `${percentage}${typeof percentage === "string" && percentage.indexOf("%") >= 0 ? "" : "%"}` },
    [percentage, customStyles],
  )
  return (
    <LineContainer className="pos-relative b-r-5 bg-color-greyLight-1" ref={ref}>
      <ProgressLine style={getElementStyles} />
      {children}
    </LineContainer>
  )
})

BsProgressbar.propTypes = {
  percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  customStyles: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

BsProgressbar.defaultProps = {
  percentage: "0"
}

export default BsProgressbar
