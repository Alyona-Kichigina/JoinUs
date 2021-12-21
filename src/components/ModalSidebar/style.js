import styled from "styled-components";


export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: end;
`
export const Modal = styled.div`
  background-color: var(--color-white);
  min-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`