import React, { useCallback, useContext, useRef, useState } from "react"
import PropTypes from "prop-types"
import OverlayMenu from "@Components/OverlayMenu/index"
import { ScrollContainer } from "@constants"

const RenderOverlayMenu = ({ children, renderOverlayMenu, onOpenOverlayMenu, MenuComponent }) => {
  const refContainer = useContext(ScrollContainer)
  const overlayBoundRef = useRef()
  const [openOverlayEvent, setOpenOverlayEvent] = useState(null)
  const openEvent = useCallback((e) => {
    onOpenOverlayMenu(e)
    setOpenOverlayEvent(e)
  }, [onOpenOverlayMenu])
  const renderOverlay = useCallback(({ children, ...props }) => renderOverlayMenu ? (
    <MenuComponent
      {...props}
      refContainer={refContainer}
      refTargetParent={overlayBoundRef.current}
      event={openOverlayEvent}
    >
      {children}
    </MenuComponent>
  ) : null, [openOverlayEvent, refContainer, renderOverlayMenu])
  return children(overlayBoundRef, openEvent, renderOverlay)
}

RenderOverlayMenu.propTypes = {
  onOpenOverlayMenu: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  renderOverlayMenu: PropTypes.bool,
  MenuComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node, PropTypes.object])
}

RenderOverlayMenu.defaultProps = {
  MenuComponent: OverlayMenu
}

export default RenderOverlayMenu
