import React, { useContext, useMemo } from "react"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { RouteContext, GlobalPermissions } from "@/constants"
import NavigationButton from "./NavigationButton"

const PermissionLink = ({ name, openInNewTab, to, ...props }) => {
  const {path, onOpenNewTab} = useContext(RouteContext)
  const permissions = useContext(GlobalPermissions)
  const nLink = typeof to === "function" ? to() : to
  const resolvedPath = useMemo(
    () => typeof nLink === "string" ? nLink.startsWith(path) ? nLink : `${path}${nLink}` : nLink,
    [path, nLink]
  )

  // onOpenNewTab {

// }
  return permissions[name]
    ? openInNewTab
      ? <NavigationButton {...props} to={resolvedPath} onClick={onOpenNewTab} />
      : <NavLink {...props} to={resolvedPath} />
    : null
}

PermissionLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  openInNewTab: PropTypes.bool
}
export default PermissionLink
