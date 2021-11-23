import React, { useEffect, useMemo, useState } from "react"
import {
  LeftMenuContainer, LeftMenuLogo, LeftMenuItem, ToggleToolbar, ListTile, ImgBanner, OpenMenuItem
} from "./styles"
import {tabNavigationMenu} from "./constants"

const NavigationDrawer = () => {
  const [leftWidth, setLeftWidth] = useState(256)

  const hideToolbar = leftWidth === 256
  const toggleToolbar = () => {

  }
  return (
    <LeftMenuContainer style={{ width: leftWidth }}>
      <LeftMenuLogo>
        <img src="/assets/logo.svg" alt="" />
        <OpenMenuItem hideToolbar={hideToolbar} className="display-flex a-i-center">
          <img src="/assets/minLogo.svg" alt="" />
        </OpenMenuItem>
      </LeftMenuLogo>
      {tabNavigationMenu.map(({alias, picture}) => (
        <LeftMenuItem
        >
          <ListTile>
            <div className="icon-container transition-icon cursor a-i-center j-c-center display-flex">
              <div className="icon-navigation-drawer" dangerouslySetInnerHTML={{__html: picture}}></div>
            </div>
            {alias}
          </ListTile>
        </LeftMenuItem>
        )
      )}
      <ImgBanner src="/assets/banner.jpg" alt=""/>
      <ToggleToolbar
        onClick={toggleToolbar}
        className="flex"
      >
        <img src="/assets/icons/angleDouble.svg" alt=""/>
        Свернуть
      </ToggleToolbar>
    </LeftMenuContainer>
  );
};

export default NavigationDrawer;
