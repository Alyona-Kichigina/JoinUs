import React from 'react';
import styled from "styled-components"
import PropTypes from "prop-types"

const Icon = styled.div`
  border: solid var(--color-light-blue-2);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  &:hover {
    border-color: var(--color-darken-blue-2);
  }
  &.right {
    transform: rotate(-45deg);
  }
  &.left {
    transform: rotate(135deg);
  }
  &.up {
    transform: rotate(-135deg);
  }
  &.down {
    transform: rotate(45deg);
  }
`

const IconToggleIndicator = ({className}) => {
  return (
    <Icon className={className}>

    </Icon>
  );
};

IconToggleIndicator.propTypes = {
  className: PropTypes.string,
}

export default IconToggleIndicator;
