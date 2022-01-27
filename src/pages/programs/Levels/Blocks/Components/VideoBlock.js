import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import BlockHeader from "./BlockHeader";
import VideoFiles from "../../../../../components/Fields/Files/VideoFiles";


const VideoBlock = ({
  position, className, onInput, value, value: { entity }, onMove, onDelete, environmentState
}) => {

  const handleInput = useCallback((nextValue, id) => {
    onInput({ ...value, [id]: nextValue }, position)
  }, [onInput, value, position])

  return (
    <div className={className}>
      <BlockHeader
        title="Блок “Видео”"
        position={position}
        onMove={onMove}
        onDelete={onDelete}
        environmentState={environmentState}
      />

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <span className="fs-16 fw-700">Видео</span>
        </div>
        <VideoFiles
          id="entity"
          className="mt-2.5"
          value={entity}
          onInput={handleInput}
        />
      </div>
    </div>
  );
};

VideoBlock.propTypes = {
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

VideoBlock.defaultProps = {
  className: "",
  value: { entity: [] }
};

export default VideoBlock;