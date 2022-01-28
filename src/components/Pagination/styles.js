import styled from "styled-components"

export const PaginationContainer = styled.div`
  height: 50px;
 min-height: 50px;
 display: flex;
 align-items: center;
  justify-content: center;
 .pagination-item:not(:last-child) {
  margin-right: 20px;
}
.pagination-current-page {
  font-weight: 700;
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  width: 26px;
  border-radius: 6px;
  background-color: var(--color-light-blue-2);
}
`
