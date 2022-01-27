import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import BlockHeader from "./BlockHeader";
import Select from "../../../../../components/Fields/Select";
import {HEADER_TYPE, TEXT_TYPE, VIDEO_TYPE, PHOTO_TYPE, FORM_TYPE, QUIZ_TYPE, SMILE_TYPE } from '../constants'

const options = [
  {
    label: "Заголовок",
    type: HEADER_TYPE,
  },
  {
    label: "Текст",
    type: TEXT_TYPE,
  },
  {
    label: "Видео",
    type: VIDEO_TYPE,
  },
  {
    label: "Фото",
    type: PHOTO_TYPE,
  },
  {
    label: "Опрос",
    type: FORM_TYPE,
  },
  {
    label: "Список полей",
    type: QUIZ_TYPE,
  },
  {
    label: "Опрос смайлами",
    type: SMILE_TYPE,
  },
]


const NewBlock = ({ position, className, onInput }) => {
  return (
    <div className={className}>
      <BlockHeader title="Блок" position={position} />

      <div className="mt-6">
        <span className="fs-16 fw-700">Выберите тип блока</span>
        <Select
          id="text"
          className="mt-2.5"
          placeholder="Как мы работаем"
          onInput={onInput}
          options={options}
          valueKey="type"
          labelKey="label"
        />
      </div>
    </div>
  );
};

NewBlock.propTypes = {
  position: PropTypes.number.isRequired,
  onInput: PropTypes.func.isRequired,
  className: PropTypes.string,
};

NewBlock.defaultProps = {
  className: ""
};

export default NewBlock;