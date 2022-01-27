import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import { PositionBadge, Title } from '../styles'
import {ArrowUP, Trash} from "../../../../Constants";
import {DIRECTION_DOWN, DIRECTION_UP} from "../../../../../constants";
const BlockHeader = ({ title, position, onDelete, onMove, environmentState }) => {

  const handleMove = useCallback((direction) => () => {
    onMove(direction, position)
  }, [position, onMove])

  return (
    <div className="flex items-center">
      <PositionBadge className="mr-2">
        {position}
      </PositionBadge>
      <Title>{title}</Title>
      <div
        className="flex items-center j-c-center ml-auto"
      >
        <button
          className="arrow-icon"
          dangerouslySetInnerHTML={{__html: ArrowUP}}
          onClick={handleMove(DIRECTION_UP)}
          disabled={position === 1}
        />
        <button
          className="arrow-icon arrow-down"
          dangerouslySetInnerHTML={{__html: ArrowUP}}
          onClick={handleMove(DIRECTION_DOWN)}
          disabled={environmentState.length === position}
        />
      </div>
      <button
        className="trash-icon ml-7"
        dangerouslySetInnerHTML={{__html: Trash}}
        onClick={onDelete}
      />
    </div>
  );
};

BlockHeader.propTypes = {
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  environmentState: PropTypes.array.isRequired,
};

BlockHeader.defaultProps = {
  environmentState: [],
  onMove: () => null,
  onDelete: () => null,
};

export default BlockHeader;