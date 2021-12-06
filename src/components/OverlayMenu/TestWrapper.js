import React, { useCallback, useEffect, useRef, useState } from "react"
import OverlayMenu from "@/Components/OverlayMenu/index"

const TestWrapper = () => {
  const [event, setEventValue] = useState({})
  const [axis, setAxis] = useState("y")
  const targetRef = useRef()
  const eventRef = useRef(event)
  eventRef.current = event
  const setAxisHandler = useCallback((axis) => () => setAxis(axis), [setAxis])
  const setEventCoors = useCallback(({ x, y }) => {
    setEventValue({ ...eventRef.current, x, y })
  }, [setEventValue])

  useEffect(() => {
    setEventValue({ ...eventRef.current, target: targetRef.current })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", setEventCoors)
    return () => {
      window.removeEventListener("mousemove", setEventCoors)
    }
  }, [setEventCoors])

  return (
    <div ref={targetRef}>
      <OverlayMenu
        event={event}
        axis={axis}
      >
        <h2 className="">
          General components
        </h2>
      </OverlayMenu>
      <div className="display-flex fd-column bg-color-greyDarken">
        <button
          type="button"
          onClick={setAxisHandler(undefined)}
        >
          axis null
        </button>
        <button
          type="button"
          onClick={setAxisHandler("x")}
        >
          axis x
        </button>
        <button
          type="button"
          onClick={setAxisHandler("y")}
        >
          axis y
        </button>
      </div>
    </div>
  )
}

export default TestWrapper
