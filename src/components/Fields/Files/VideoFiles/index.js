import React from 'react';
import PropTypes from 'prop-types';
import FileInput from "../FileInput";
import styled from "styled-components"
import {EditIcon, RotateIcon, Trash} from "../../../../pages/Constants";

const VideoContainer = styled.div`
  width: 300px;
  height: 168.75px;
`


const VideoFiles = (props) => {
  return (
    <FileInput title="видео" {...props}>
      {({value}) => (
        <div className="flex">
          {value.map(({file}) => (
            <div className="flex items-center flex-col mr-2" key={file}>
              <VideoContainer className="rounded-2xl overflow-hidden">
                <video
                  src={file}
                  controls
                />
              </VideoContainer>
              <div className="flex items-center mt-1.5">
                <div
                  className="edit-icon"
                  dangerouslySetInnerHTML={{__html: EditIcon}}
                />
                <div
                  className="trash-icon ml-7"
                  dangerouslySetInnerHTML={{__html: Trash}}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </FileInput>
  );
};

VideoFiles.propTypes = {
  className: PropTypes.string,
  value: PropTypes.array,
};

VideoFiles.defaultProps = {
  className: "",
  value: []
};

export default VideoFiles;
