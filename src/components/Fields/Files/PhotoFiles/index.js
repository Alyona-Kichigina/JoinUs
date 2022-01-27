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
      {({value}) => (
        <div className="flex">
          {value.map(({src}) => (
            <div className="flex items-center flex-col mr-2">
              <PhotoContainer
                className="rounded-2xl overflow-hidden"
                src={src}
              />
              <div className="flex items-center mt-1.5">
                <div
                  className="edit-icon"
                  dangerouslySetInnerHTML={{__html: EditIcon}}
                />
                <div
                  className="trash-icon ml-7"
                  dangerouslySetInnerHTML={{__html: Trash}}
                />
                <div
                  className="trash-icon ml-7"
                  dangerouslySetInnerHTML={{__html: RotateIcon}}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </FileInput>
  );
};

PhotoFiles.propTypes = {

};

export default PhotoFiles;