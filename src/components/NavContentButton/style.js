import styled from "styled-components";

export const NawContentBtn = styled.div`
    padding: 16px 16px 0 16px;
    min-height: 46px;
    font-weight: 700;
    border-bottom: 2px solid  var(--color-light-grey-2);
    border-radius: 4px 4px 0 0;
`

export const NawContentItem = styled.div`
    margin-right: 32px;
  transition: all 0.5s ease 0s;
    &:last-child {
        margin-right: 0;
    }
    a {
        &:hover {
            color: var(--color-blue);
        } 
    }
  .active {
    padding-bottom: 14px;
    color:  var(--color-blue);
    border-bottom: 2px var(--color-blue) solid;
  }
`

