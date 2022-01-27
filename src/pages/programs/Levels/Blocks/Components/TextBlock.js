import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import BlockHeader from "./BlockHeader";
import BsInput from "../../../../../components/Fields/Input";
import BadgeBlock from "./BadgeBlock";

const options = [
  "Текст",
  "Код",
]

const TextBlock = ({
 position, className, onInput, value, value: { headerType, text }, onMove, onDelete, environmentState
}) => {
  const handleInput = useCallback((nextValue, id) => {
    onInput({ ...value, [id]: nextValue }, position)
  }, [onInput, value, position])

  return (
    <div className={className}>
      <BlockHeader
        title="Блок “Текст”"
        position={position}
        onMove={onMove}
        onDelete={onDelete}
        environmentState={environmentState}
      />
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <span className="fs-16 fw-700">Текст</span>
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
          type="textarea"
          autosize
          minHeight={150}
          onInput={handleInput}
          value={text}
        />
      </div>
    </div>
  );
};

TextBlock.propTypes = {
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

TextBlock.defaultProps = {
  className: "",
  value: {}
};

export default TextBlock;