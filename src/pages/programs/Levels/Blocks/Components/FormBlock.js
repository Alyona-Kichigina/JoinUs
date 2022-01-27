import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import BlockHeader from "./BlockHeader";
import BsInput from "../../../../../components/Fields/Input";
import NumericInput from "../../../../../components/Fields/NumericInput";


const FormBlock = ({
 position, className, onInput, value, value: {fieldCount, text}, onMove, onDelete, environmentState
}) => {
  const handleInput = useCallback((nextValue, id) => {
    onInput({...value, [id]: nextValue}, position)
  }, [onInput, value, position])

  return (
    <div className={className}>
      <BlockHeader
        title="Блок “Список полей”"
        position={position}
        onMove={onMove}
        onDelete={onDelete}
        environmentState={environmentState}
      />

      <div className="mt-6">
        <span className="fs-16 fw-700">Заголовок</span>
        <BsInput
          id="text"
          className="mt-2.5 mb-2"
          placeholder="Как мы работаем"
          onInput={handleInput}
          value={text}
        />
        <span className="fs-16 fw-700">Количество полей</span>
        <NumericInput
          id="fieldCount"
          className="mt-2.5"
          placeholder="3"
          onInput={handleInput}
          value={fieldCount}
          onlyInt
        />
      </div>
    </div>
  );
};

FormBlock.propTypes = {
  position: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  environmentState: PropTypes.array.isRequired,
  className: PropTypes.string,
  value: PropTypes.shape({
    fieldCount: PropTypes.number,
    text: PropTypes.string
  })
};

FormBlock.defaultProps = {
  className: "",
  value: {}
};

export default FormBlock;