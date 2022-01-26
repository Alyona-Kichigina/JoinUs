import React, { useCallback, useMemo} from "react"
import PropTypes from "prop-types"
import EditDateForSave from "../../../utils/Date/EditDateForSave";
import {PRESENT_DATE_FORMAT, RELEASE_DATE_FORMAT, CREATE_DATE_FORMAT} from "@constants"

export default (OriginalComponent) => ({value, onInput, ...props}) => {
  const handleInput = useCallback((v, id) => {
    onInput(EditDateForSave(v, id === "create_date" ? CREATE_DATE_FORMAT : RELEASE_DATE_FORMAT), id)
  }, [onInput, value])

  const getDate = useMemo(() => {
    if (value && value.length > 0) {
      return EditDateForSave(value, PRESENT_DATE_FORMAT)
    }
  }, [value])

  return (
    <OriginalComponent
      {...props}
      value={getDate}
      onInput={handleInput}
    />
  )
}
