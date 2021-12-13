import styled from "styled-components";
import {LeftMenuItem} from "../NavigationDrawer/styles";


export const NawContentItem = styled.div`
  transition: all 0.5s ease 0s;
  &:hover {
    color: var(--color-blue);
    --color-light-blue-2: var(--color-white);
  }
  .active {
    padding-bottom: 12px;
    color:  var(--color-blue);
    border-bottom: 2px var(--color-blue) solid;
  }
`

export const NawContentBtn = styled.div`
  position: relative;
  background: var(--color-white);
  height: 100%;
  flex: 0 0 auto;
  transition: .3s;
  color: var(--color-light-blue-2);
  font-weight: 700;
  border-right: 1px solid var(--color-light-grey-2);
  .active {
    ${LeftMenuItem} {
      background: var(--blue-gradient);
      color: var(--color-white);
      --color-light-blue-2: var(--color-white);
    }
  }
`