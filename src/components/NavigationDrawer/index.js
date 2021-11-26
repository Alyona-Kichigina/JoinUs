import React, { useEffect, useMemo, useState } from "react"
import {
  LeftMenuContainer, LeftMenuLogo, LeftMenuItem, ToggleToolbar, ListTile, ImgBanner, OpenMenuItem
} from "./styles"
import {tabNavigationMenu} from "./constants"
import NavigationButton from "../PermissionLink/NavigationButton"
import { NavLink } from "react-router-dom"

const NavigationDrawer = () => {
  const [leftWidth, setLeftWidth] = useState(84)
  const [toggleArrow, setToggleArrow] = useState()
  const [iconArrowStyle, setIconArrowStyle] = useState()
  const [getHidden, setGetHidden] = useState(localStorage.getItem("APP_NAVBAR"))
  useEffect(() => {
    if (getHidden === "close") {
      setLeftWidth(84)
      setToggleArrow("default")
      setIconArrowStyle("default")
    } else {
      setLeftWidth(150)
      setToggleArrow("default-open")
      setIconArrowStyle("default-open")
    }
  }, [])
  useEffect(() => {
    setLeftWidth(getHidden === "close" ? 84 : 256)
  }, [getHidden])
  const hideToolbar = leftWidth === 84
  const toggleToolbar = () => {
    localStorage.setItem("APP_NAVBAR", getHidden === "close" ? "open" : "close")
    setToggleArrow(getHidden === "close" ? "open" : "close")
    setIconArrowStyle(getHidden === "close" ? "open" : "close")
    setGetHidden(localStorage.getItem("APP_NAVBAR"))
  }
  return (
    <LeftMenuContainer style={{ width: leftWidth }}>
      <LeftMenuLogo>
        {hideToolbar ? (
          <OpenMenuItem hideToolbar={!hideToolbar} className="display-flex a-i-center">
            <img src="/assets/minLogo.svg" alt="" />
          </OpenMenuItem>
        )
        :
        (
          <OpenMenuItem hideToolbar={hideToolbar} className="display-flex a-i-center">
            <img src="/assets/logo.svg" alt="" />
          </OpenMenuItem>
        )
        }
      </LeftMenuLogo>
      {tabNavigationMenu.map(({alias, picture, router}) => (
        <LeftMenuItem
          key={alias}
          hideToolbar={hideToolbar}
        >
          <NavLink to={router}>
            <ListTile hideToolbar={hideToolbar}>
              <div className="icon-container transition-icon cursor a-i-center j-c-center display-flex">
                <div className="icon-navigation-drawer" dangerouslySetInnerHTML={{__html: picture}}/>
              </div>
              {!hideToolbar && (
                <OpenMenuItem hideToolbar={hideToolbar} className="display-flex a-i-center">
                  <div className="">{alias}</div>
                </OpenMenuItem>
              )}
            </ListTile>
          </NavLink>
        </LeftMenuItem>
        )
      )}
      {!hideToolbar && (
        <ImgBanner src="/assets/banner.jpg" alt="" className={` ${hideToolbar ? "" : "show"}`}/>
      )}
      <ToggleToolbar
        onClick={toggleToolbar}
        className={`display-flex ${toggleArrow} a-i-center`}
      >
        <img src="/assets/icons/angleDouble.svg" alt="" className={`icon-arrow ${iconArrowStyle}`}/>
        {!hideToolbar && (
          <span className="p-l-16">
            Свернуть
          </span>
        )}
      </ToggleToolbar>
    </LeftMenuContainer>
  );
};

export default NavigationDrawer;
