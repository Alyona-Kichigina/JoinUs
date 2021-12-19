import { useCallback, useEffect, useRef } from "react"

export default ({ children, byKey, closeWindow }) => {
  const currEventRef = useRef()

  const eventIntespection = useCallback((e) => {
    if (currEventRef.current !== e) {
      closeWindow(e)
    }
  }, [closeWindow])

  useEffect(() => {
    // TODO потенциально бажит, нужно проверить кол-во создаваймых эвентов
    if (byKey !== undefined) {
      if (byKey) {
        document.addEventListener("mousedown", eventIntespection)
        return () => {
          document.removeEventListener("mousedown", eventIntespection)
        }
      }
    } else {
      document.addEventListener("mousedown", eventIntespection)
      return () => {
        document.removeEventListener("mousedown", eventIntespection)
      }
    }
  }, [eventIntespection, byKey])

  const updateEvent = useCallback((e) => {
    e.persist()
    currEventRef.current = e.nativeEvent
  }, [])

  return children(updateEvent)
}
