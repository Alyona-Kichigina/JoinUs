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
  }, [getHidden])
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
        <NavLink to={router} key={alias}>
          <LeftMenuItem
            hideToolbar={hideToolbar}
          >
            <ListTile hideToolbar={hideToolbar}>
              <div className="icon-container transition-icon cursor items-center justify-center flex">
                <div className="icon-navigation-drawer" dangerouslySetInnerHTML={{__html: picture}}/>
              </div>
              {!hideToolbar && (
                <OpenMenuItem hideToolbar={hideToolbar} className="flex items-center">
                  {alias}
                </OpenMenuItem>
              )}
            </ListTile>
          </LeftMenuItem>
        </NavLink>
        )
      )}
      {!hideToolbar && (
        <ImgBanner src="/assets/banner.jpg" alt="" className={`${hideToolbar ? "" : "show"}`}/>
      )}
      <ToggleToolbar
        onClick={toggleToolbar}
        className={`flex ${toggleArrow} items-center`}
      >
        <div className={`${iconArrowStyle} arrow`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5899 5.58958C10.9153 5.26414 10.9153 4.73651 10.5899 4.41107C10.2645 4.08563 9.73683 4.08563 9.4114 4.41107L4.4114 9.41107C4.09591 9.72655 4.08488 10.2345 4.38636 10.5634L8.96969 15.5634C9.28068 15.9027 9.80782 15.9256 10.1471 15.6146C10.4864 15.3036 10.5093 14.7765 10.1983 14.4372L6.1541 10.0254L10.5899 5.58958Z" fill="#56809F" stroke="#56809F"/>
            <path d="M16.4226 5.58958C16.748 5.26414 16.748 4.73651 16.4226 4.41107C16.0972 4.08563 15.5695 4.08563 15.2441 4.41107L10.2441 9.41107C9.9286 9.72655 9.91756 10.2345 10.219 10.5634L14.8024 15.5634C15.1134 15.9027 15.6405 15.9256 15.9798 15.6146C16.319 15.3036 16.342 14.7765 16.031 14.4372L11.9868 10.0254L16.4226 5.58958Z" fill="#56809F" stroke="#56809F"/>
          </svg>
        </div>
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
