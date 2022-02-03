import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import BaseAvatar from './DefaultAvatarSvg'
import {EditIcon} from "../../pages/Constants";
import {AvatarContainer, EditButton, BaseAvatarContainer} from "./styles";
import FileInputController from "../Fields/Files/FileInputController";


const Avatar = ({className, ...props}) => {
  const refContainer = useRef()
  return (
    <AvatarContainer
      ref={refContainer}
      className={`relative flex flex-row items-center justify-center ${className}`}
    >
      <FileInputController {...props} containerRef={refContainer}>
        {({value: [avatar], onEdit}) =>
          <>
          {avatar
            ? <div className="flex flex-col w-full h-full overflow-hidden rounded-full">
                <img src={avatar.src} alt=""/>
            </div>
            : <BaseAvatarContainer
              dangerouslySetInnerHTML={{__html: BaseAvatar}}
              className="overflow-hidden"
            />
          }
          <EditButton
            onClick={onEdit}
            className="edit-icon flex items-center justify-center"
            dangerouslySetInnerHTML={{__html: EditIcon}}
          />
        </>
        }
      </FileInputController>
    </AvatarContainer>
  );
};

Avatar.propTypes = {};

Avatar.defaultProps = {};

export default Avatar;
