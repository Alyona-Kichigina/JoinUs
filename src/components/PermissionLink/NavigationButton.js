import React, { useCallback } from "react"
import PropTypes from "prop-types"

const NavigationButton = ({ to, onClick, children, ...props }) => {
  const onClickHandler = useCallback(() => onClick(to), [to, onClick])
  return (
    <button type="button" {...props} onClick={onClickHandler}>
      {children}
    </button>
  )
}

NavigationButton.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default NavigationButton
