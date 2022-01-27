import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import BlockHeader from "./BlockHeader";
import BsInput from "../../../../../components/Fields/Input";
import BadgeBlock from "./BadgeBlock";

const options = [
  "H1",
  "H2",
  "H3",
]

const HeaderBlock = ({
     position, className, onInput, value, value: { headerType, text }, onMove, onDelete, environmentState
}) => {
  const handleInput = useCallback((nextValue, id) => {
    onInput({ ...value, [id]: nextValue }, position)
  }, [onInput, value, position])

  return (
    <div className={className}>
      <BlockHeader
        title="Блок “Заголовок”"
        position={position}
        onMove={onMove}
        onDelete={onDelete}
        environmentState={environmentState}
      />

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <span className="fs-16 fw-700">Заголовок</span>
          <BadgeBlock
            id="headerType"
            options={options}
            onInput={handleInput}
            value={headerType}
          />
        </div>
        <BsInput
          id="text"
          className="mt-2.5"
          placeholder="Как мы работаем"
          value={text}
          onInput={handleInput}
        />
      </div>
    </div>
  );
};

HeaderBlock.propTypes = {
  position: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  environmentState: PropTypes.array.isRequired,
  className: PropTypes.string,
  value: PropTypes.shape({
    headerType: PropTypes.string,
    text: PropTypes.string
  })
};

HeaderBlock.defaultProps = {
  className: "",
  value: {}
};


export default HeaderBlock;