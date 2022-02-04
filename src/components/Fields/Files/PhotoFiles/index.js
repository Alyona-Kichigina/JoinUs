import React from 'react';
import PropTypes from 'prop-types';
import FileInput from "../FileInput";
import styled from "styled-components"
import {EditIcon, Trash, RotateIcon} from "../../../../pages/Constants";

const PhotoContainer = styled.img`
  width: 300px;
`

const PhotoFiles = (props) => {
  return (
    <FileInput title="фото" {...props}>
      {({value, onDelete, onEdit, onDeleteTempFile, onReUpload}) => (
        <div className="flex flex-wrap">
          {value.map(({file, progress, fail}, index) => (
            <div className="flex items-center flex-col mr-2 mb-2">
              <PhotoContainer
                className="rounded-2xl overflow-hidden"
                src={file}
              />
              {progress === undefined && <div className="flex items-center mt-1.5">
                <button
                  className="edit-icon"
                  dangerouslySetInnerHTML={{__html: EditIcon}}
                  onClick={() => onEdit(index)}
                />
                <button
                  className="trash-icon ml-7"
                  dangerouslySetInnerHTML={{__html: Trash}}
                  onClick={() => onDelete(index)}
                />
                <button
                  className="trash-icon ml-7"
                  dangerouslySetInnerHTML={{__html: RotateIcon}}
                />
              </div>
              }
            </div>
          ))}
        </div>
      )}
    </FileInput>
  );
};

PhotoFiles.propTypes = {};

export default PhotoFiles;
