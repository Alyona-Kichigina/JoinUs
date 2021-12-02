import React, { useEffect, useState } from "react"
import {
  LeftMenuContainer, LeftMenuLogo, LeftMenuItem, ToggleToolbar, ListTile, ImgBanner, OpenMenuItem
} from "./styles"
import {tabNavigationMenu} from "./constants"
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
    localStorage.setItem("APP_NAVBAR", getHidden === "close" ? "" : "close")
    setToggleArrow(getHidden === "close" ? "" : "close")
    setIconArrowStyle(getHidden === "close" ? "" : "close")
    setGetHidden(localStorage.getItem("APP_NAVBAR"))
  }
  return (
    <LeftMenuContainer style={{ width: leftWidth }}>
      <LeftMenuLogo>
        {hideToolbar ? (
          <OpenMenuItem hideToolbar={!hideToolbar} className="flex items-center">
            <img src="/assets/minLogo.svg" alt="" />
          </OpenMenuItem>
        )
        :
        (
          <OpenMenuItem hideToolbar={hideToolbar} className="flex items-center">
            <img src="/assets/logo.svg" alt="" />
          </OpenMenuItem>
        )
        }
      </LeftMenuLogo>
      {tabNavigationMenu.map(({alias, picture, router}) => (
        <NavLink to={router}>
          <LeftMenuItem
            key={alias}
            hideToolbar={hideToolbar}
          >
            <ListTile hideToolbar={hideToolbar}>
              <div className="icon-container transition-icon cursor items-center justify-center flex">
                <div className="icon-navigation-drawer" dangerouslySetInnerHTML={{__html: picture}}/>
              </div>
              {!hideToolbar && (
                <OpenMenuItem hideToolbar={hideToolbar} className="flex items-center">
                  <div className="">{alias}</div>
                </OpenMenuItem>
              )}
            </ListTile>
          </LeftMenuItem>
        </NavLink>
        )
      )}
      {!hideToolbar && (
        <ImgBanner src="/assets/banner.jpg" alt="" className={` ${hideToolbar ? "" : "show"}`}/>
      )}
      <ToggleToolbar
        onClick={toggleToolbar}
        className={`flex ${toggleArrow} items-center`}
      >
        <img src="/assets/icons/angleDouble.svg" alt="" className={`${iconArrowStyle}`}/>
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
