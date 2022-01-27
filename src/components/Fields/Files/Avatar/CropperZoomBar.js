import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"
import BsProgressbar from "../../../ProgressBars/BsProgressBar"
// import Icon from "@/Components/Icon"
import styled from "styled-components"
// import { ZoomIcon } from "./icons/ZoomIcon"

const SettingsIndicator = styled.button`
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: var(--color-light-gold-1);
  border-radius: 50%;
  top: -1px;
`

// const ZoomIconComponent = Icon(ZoomIcon)

const CropperZoomBar = ({ value, onInput, className }) => {
  const refProgressBar = useRef()
  const [startCord, setStartCord] = useState()
  const initDragging = useCallback(({ pageX }) => {
    setStartCord(pageX)
    document.body.style.cursor = "col-resize"
  }, [])

  const dragging = useCallback(({ pageX: x }) => {
    window.requestAnimationFrame(() => {
      const { current: propgressBar } = refProgressBar
      const { left, right } = propgressBar.getBoundingClientRect()
      onInput((((x > startCord ? x < right ? x : right : x > left ? x : left) - left) / propgressBar.clientWidth) * 100)
    })
  }, [onInput, startCord])

  const stopDragging = useCallback(() => {
    setStartCord(undefined)
    document.body.style.cursor = ""
  }, [])

  useEffect(() => {
    if (startCord !== undefined) {
      document.addEventListener("mousemove", dragging)
      document.addEventListener("mouseup", stopDragging)
      return () => {
        document.removeEventListener("mousemove", dragging)
        document.removeEventListener("mouseup", stopDragging)
      }
    }
  }, [dragging, startCord, stopDragging])

  return (
    <div className={className}>
      {/*<ZoomIconComponent className="m-b-5 color-greyDarken" />*/}
      <BsProgressbar ref={refProgressBar}>
        <SettingsIndicator
          type="button"
          style={useMemo(() => ({ left: `${value}%` }), [value])}
          onMouseDown={initDragging}
        />
      </BsProgressbar>
    </div>
  )
}

CropperZoomBar.propTypes = {
  onInput: PropTypes.func.isRequired,
  value: PropTypes.number,
  className: PropTypes.string,
}

CropperZoomBar.defaultProps = {
  value: 0
}

export default CropperZoomBar
