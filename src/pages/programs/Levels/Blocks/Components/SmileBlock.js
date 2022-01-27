import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import BlockHeader from "./BlockHeader";
import BsInput from "../../../../../components/Fields/Input";
import styled from "styled-components"
import {
  Smile1,
  Smile2,
  Smile3,
  Smile4,
  Smile5,
  Smile6,
  Smile7,
  Smile8,
  Smile9
} from "./smiles"
import PureDeleteItems from "../../../../../utils/Arrays/PureDeleteItems";

const SmilesContainer = styled.div`
  height: var(--height-input);
  padding: var(--padding-input);
  width: var(--width-input);
`

const Smile = styled.button`
  outline: solid ${({selected}) => selected ? "var(--color-blue)" : "transparent" };
  border-radius: 50%;
`


const smilesArray = [Smile1, Smile2, Smile3, Smile4, Smile5, Smile6, Smile7, Smile8, Smile9]

const SmileBlock = ({
  position, className, onInput, value, value: { entity, text }, onMove, onDelete, environmentState
}) => {
  const handleInput = useCallback((nextValue, id) => {
    onInput({ ...value, [id]: nextValue }, position)
  }, [onInput, value, position])

  const handleChooseSmile = useCallback((index) => () => {
    handleInput(entity.includes(index) ? PureDeleteItems(entity, entity.indexOf(index)) : [...entity, index], "entity")
  },[entity, handleInput])

  return (
    <div className={className}>
      <BlockHeader
        title="Блок “Опрос смайлами”"
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
        <span className="fs-16 fw-700">Выберите смайлы</span>
        <SmilesContainer className="flex bg-color-light-grey rounded-md mt-2">
          {smilesArray.map((smile, index) => (
            <Smile
              key={index}
              className="mr-4"
              dangerouslySetInnerHTML={{__html: smile}}
              selected={entity.includes(index)}
              onClick={handleChooseSmile(index)}
            />
          ))}
        </SmilesContainer>
      </div>
    </div>
  );
};

SmileBlock.propTypes = {
  position: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  environmentState: PropTypes.array.isRequired,
  className: PropTypes.string,
  value: PropTypes.shape({
    entity: PropTypes.array,
    text: PropTypes.string
  })
};

SmileBlock.defaultProps = {
  className: "",
  value: { entity: [] }
};

export default SmileBlock;