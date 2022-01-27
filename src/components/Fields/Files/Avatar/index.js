import React, {useState, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import FileInputController from "../FileInputController";
import Cropper from "./Cropper";
import Modal from '../../../ModalWindow'

const Avatar = ({ children, userStartRatio, ...props }) => {
  const submitFilesRef = useRef()
  const [isModalOpen, setOpenModalState] = useState(false)
  const [picture, editPicture] = useState([])
  const [files, editFile] = useState([])
  const [submitCropper, setSubmitCropperFunc] = useState(() => null)

  const savePicture = useCallback((getNewPicture) => () => async () => {
    const newPicture = await getNewPicture()
    newPicture.name = files[0].name
    newPicture.lastModifiedDate = files[0].lastModifiedDate
    submitFilesRef.current([newPicture])
    editPicture([])
    submitFilesRef.current = () => null
    editFile([])
    setOpenModalState(false)
  }, [files])

  const submitFunctionBinder = useCallback((submitFunction) => {
    setSubmitCropperFunc(savePicture(submitFunction))
  }, [savePicture])
  
  const inputMiddleware = useCallback((file) => {
    return new Promise((resolve) => {
      submitFilesRef.current = resolve
      editFile(file)
      editPicture(file.map(f => URL.createObjectURL(f)))
      setOpenModalState(true)
    })
  },[])

  const cancelEditPicture = useCallback(() => {
    editPicture([])
    submitFilesRef.current([])
    submitFilesRef.current = () => null
    editFile([])
    setOpenModalState(false)
  }, [])
  
  return (
    <>
      <FileInputController onFileInput={inputMiddleware} {...props}>
        {(args) => children(args)}
      </FileInputController>
      <Modal
        isOpen={isModalOpen}
        title="Загрузка аватара"
        closeModal={cancelEditPicture}
        handleSave={submitCropper}
      >
        <Cropper
          bindSubmitFunction={submitFunctionBinder}
          options={picture}
          userStartRatio={userStartRatio}
        />
      </Modal>
    </>
  );
};

Avatar.propTypes = {

};

export default Avatar;