import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import BlockHeader from "./BlockHeader";
import PhotoFiles from "../../../../../components/Fields/Files/PhotoFiles"

const PhotoBlock = ({onInput, value, value: {entity}, position, className, onMove, onDelete, environmentState}) => {
  const handleInput = useCallback((nextValue, id) => {
    onInput({...value, [id]: nextValue}, position)
  }, [onInput, value, position])

  return (
    <div className={className}>
      <BlockHeader
        title="Блок “Фото”"
        position={position}
        onMove={onMove}
        onDelete={onDelete}
        environmentState={environmentState}
      />

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <span className="fs-16 fw-700">Фото</span>
        </div>
        <PhotoFiles
          id="entity"
          className="mt-2.5"
          placeholder="Как мы работаем"
          type="textarea"
          autosize
          minHeight={150}
          value={entity}
          onInput={handleInput}
          multiple
        />
      </div>
    </div>
  );
};

PhotoBlock.propTypes = {
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

PhotoBlock.defaultProps = {
  className: "",
  value: { entity: [] }
};

export default PhotoBlock;