import React from 'react';
import styled from "styled-components"
import PropTypes from "prop-types"

const Icon = styled.div `
  position: relative;
  ${props => props.size && `height: ${props.size}px;`}
  ${props => props.size && `width: ${props.size}px;`}
  opacity: 0.4;
  transition: opacity 150ms ease-in-out;
  &:hover {
    opacity: 1;
  }
  &:before, &:after {
    position: absolute;
    left: 15px;
    content: ' ';
    ${props => props.size && `height: ${props.size}px;`}
    width: 1px;
    background-color: var(--color-light-blue-2);
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`


const IconClose = ({size, className}) => {
  return (
    <Icon size={size}/>
  );
};

IconClose.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
}

IconClose.defaultProps = {
  size: 10
}

export default IconClose;
