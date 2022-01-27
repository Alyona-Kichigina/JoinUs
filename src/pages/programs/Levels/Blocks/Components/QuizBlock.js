import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import BlockHeader from "./BlockHeader";
import BsInput from "../../../../../components/Fields/Input";
import {PlusIcon} from "../../../../Constants";
import PureUpdateArrayItems from "../../../../../utils/Arrays/PureUpdateArrayItems";


const QuizBlock = ({
 position, className, value, value: { entity, text }, onInput, onMove, onDelete, environmentState
}) => {
  const handleInput = useCallback((nextValue, id) => {
    onInput({ ...value, [id]: nextValue }, position)
  }, [onInput, value, position])
  
  const onOptionInput = useCallback((index) => (nextValue, id) => {
    handleInput(PureUpdateArrayItems(entity || [], index, nextValue), id)
  }, [entity, handleInput])

  const onAddOption = useCallback(() => {
    handleInput([...entity, ""], "entity")
  }, [handleInput, entity])
  
  return (
    <div className={className}>
      <BlockHeader
        title="Блок “Опрос”"
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
          value={text}
          onInput={handleInput}
        />
        {entity.map((v, index) => (
          <div key={index}>
            <span className="fs-16 fw-700 mb-2">Вариант {index + 1}</span>
            <BsInput
              id="entity"
              className="mb-2 mt-2"
              placeholder="3"
              value={v}
              onInput={onOptionInput(index)}
            />
          </div>
        ))}

        <button
          className="color-blue flex items-center justify-center fw-700 mt-4"
          onClick={onAddOption}
        >
          <span dangerouslySetInnerHTML={{__html: PlusIcon}}/> Добавить пункт
        </button>
      </div>
    </div>
  );
};

QuizBlock.propTypes = {
  position: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  environmentState: PropTypes.array.isRequired,
  className: PropTypes.string,
  value: PropTypes.shape({
    text: PropTypes.string,
    entity: PropTypes.array
  })
};

QuizBlock.defaultProps = {
  className: "",
  value: {
    entity: []
  }
};

export default QuizBlock;