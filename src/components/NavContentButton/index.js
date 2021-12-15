import React from 'react';
import {Link, NavLink} from "react-router-dom";
import { NawContentBtn, NawContentItem } from "./style"

export default function NavContentBtn(props) {
  const { links = [], url } = props

  return  (
      <NawContentBtn
        className="flex flex-1 pt-4 pb-4 bg-white items-center"
      >
          {
              links.map(({id, link, name}) => (
                  <NawContentItem
                    key={id}
                  >
                      <NavLink
                          className="color-darken-blue"
                          to={`/${url}/${link}`}
                      >
                          { name }
                      </NavLink>
                  </NawContentItem>
              ))
          }
      </NawContentBtn>
  )
}

// export default NavContentBtn;
