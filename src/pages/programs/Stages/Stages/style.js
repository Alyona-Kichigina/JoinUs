import styled from "styled-components";


export const ModalTableHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 30% 30% 30%;
  margin-top: 3rem;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-light-blue-2);
  border-bottom: var(--color-light-grey-2) 1px solid;
  min-width: 600px;
  padding-bottom: 1rem;
`
export const ModalTableBody = styled.div`
  display: grid;
  grid-template-columns: 10% 45% 45%;
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  border-bottom: var(--color-light-grey-2) 1px solid;
`