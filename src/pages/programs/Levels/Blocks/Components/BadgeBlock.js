import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const BadgeButton = styled.button`
  padding: 3px 5px;
  font-weight: 600;
  ${(({selected}) => selected ? `
    background: var(--color-blue);
    color: white;
  ` : "")}
`

const BadgeBlock = ({options, onInput, value, id}) => {

  const handleInput = useCallback((nextValue) => () => {
    onInput(nextValue, id)
  }, [onInput, id])

  return (
    <div className="flex items-center bg-color-light-grey p-0.5 rounded-lg color-light-blue-2">
      {options.map((title, index) => <BadgeButton
          key={title}
          onClick={handleInput(title)}
          selected={title === value}
          className="rounded-lg"
        >
          {title}
        </BadgeButton>
      )}
    </div>
  );
};

BadgeBlock.propTypes = {
  onInput: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  id: PropTypes.string,
};

BadgeBlock.defaultProps = {
  options: []
};

export default React.memo(BadgeBlock);