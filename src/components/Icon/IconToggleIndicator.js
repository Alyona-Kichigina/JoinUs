import React from 'react';
import styled from "styled-components"
import PropTypes from "prop-types"

const Icon = styled.div`
  transition: transform 500ms ease-in-out;
  &:hover {
    border-color: var(--color-darken-blue-2);
  }
  &.up {
    transform: rotate(182deg);
  }
  &.down {
    
  }
`

const IconToggleIndicator = ({className}) => {
  return (
    <Icon className={className}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5279 5.52892C11.7883 5.26857 12.2104 5.26857 12.4708 5.52892C12.7311 5.78927 12.7311 6.21138 12.4708 6.47173L8.47075 10.4717C8.21837 10.7241 7.81198 10.7329 7.54887 10.4918L3.54887 6.82509C3.27745 6.5763 3.25912 6.15459 3.50791 5.88317C3.75671 5.61176 4.17842 5.59343 4.44983 5.84222L7.9793 9.07757L11.5279 5.52892Z" fill="#56809F" stroke="#56809F"/>
      </svg>
    </Icon>
  );
};

IconToggleIndicator.propTypes = {
  className: PropTypes.string,
}

export default IconToggleIndicator;
