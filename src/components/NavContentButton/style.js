import styled from "styled-components";

export const NawContentBtn = styled.div`
    padding: 16px 0 0 0;
    min-height: 46px;
    font-weight: 700;
    border-bottom: 3px solid  var(--color-light-grey-2);
    border-radius: 4px 4px 0 0;
`

export const NawContentItem = styled.div`
  transition: all 0.5s ease 0s;
  a {
    font-weight: 700;
    padding-left: 16px;
    padding-right: 16px;
  }
  .active {
    padding-bottom: 14px;
    color:  var(--color-blue);
    position: relative;
    &:before {
      content: "";
      width: 100%;
      height: 2px;
      background: var(--color-blue);
      position: absolute;
      bottom: 1px;
      left: 0;
    }
  }
`

