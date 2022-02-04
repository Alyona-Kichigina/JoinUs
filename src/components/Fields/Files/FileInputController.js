import React, {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import dayjs from "dayjs"
import axios from "axios";
import PropTypes from 'prop-types';
import {UPLOADS, DEFAULT_URL} from "../../APIList";

import uniqueId from "lodash/uniqueId";
import Pipe from '../../../utils/FunctionsCall/pipe'
import {DEFAULT_DATE_FORMAT} from '../../../constants'
import {isMimeTypeAllowed, isFileSizeAllowed} from "../../../utils/Files/FileValidation"
import PureDeleteItems from "../../../utils/Arrays/PureDeleteItems";

const FileInputController = ({
 containerRef, id, multiple, allowedTypes, unAllowedMimeTypes, value, onInput, children, onFileInput
}) => {
  const [position, setPosition] = useState(0)
  const fileInputRef = useRef()
  const focusInput = useCallback((position) => {
    if (typeof position === "number") {
      setPosition(position)
    }
    fileInputRef.current.click()
  }, [])

  const [isFileOverflowed, setOverflowedStatus] = useState(false)
  const [rejectedFiles, setRejectedFiles] = useState("")
  const [tempFiles, setTempFiles] = useState([])
  const refFileOverStatus = useRef(isFileOverflowed)
  refFileOverStatus.current = isFileOverflowed

  const updateValue = useCallback((value) => {
    onInput(value, id)
  }, [id, onInput])

  const progressUpload = useCallback((files) => ({loaded, total}) => {
    const filesLength = files.length
    const {f} = files.reduce((acc, {size, ...file}, i) => {
      let progress = i + 1 === filesLength ? acc.loaded : acc.loaded * (size / acc.total + (filesLength - i) / 100)
      progress = progress > size ? size : progress > 0 ? progress : 1
      acc.loaded -= progress
      acc.total -= size
      acc.f.push({...file, size, progress: Math.round((progress * 100) / size)})
      return acc
    }, {total, loaded, f: []})
    setTempFiles((prevTempFiles) => prevTempFiles.map(file => f.find(newFile => newFile.id === file.id) || file))
  }, [])

  const uploadFiles = useCallback(async (files) => {
    try {
      const uploadedFiles = (await Promise.all(files.map(({fileData}) => {
      const FData = new FormData()
        FData.append("file", fileData);
        FData.append("remark", fileData.remark);
        return axios.post(`${DEFAULT_URL}/${UPLOADS}/`, FData, {
        // return axios.post(`http://localhost/api-active/${UPLOADS}/`, FData, {
          onUploadProgress: progressUpload(files),
        })
      }))).map(v => v.data)
      setTempFiles((prevTempFiles) => {
        const nextTempFiles = [...prevTempFiles]
        let position
        files.forEach((file) => {
          position = [nextTempFiles.splice(nextTempFiles.indexOf(file), 1)].position - files.length - 1;
        })
        if (position !== 0) {
          const nextValue = [...value]
          nextValue.splice(position, files.length, ...uploadedFiles)
          updateValue(nextValue)
        } else {
          updateValue(multiple ? [...value, ...uploadedFiles] : uploadedFiles)
        }
        return nextTempFiles
      })

      fileInputRef.current.value = ""
    } catch (e) {
      setTempFiles((prevTempFiles) => prevTempFiles
        .map((item) => (item.id ? {...item, progress: 0, fail: true} : item
        )))
    }
  }, [multiple, updateValue, value, progressUpload])

  const handleInput = useCallback(async ({target: {files}}) => {
    const {allowed, rejected} = Object.values(files).reduce((acc, file) => {
        new Pipe(file, value => acc.allowed.push(value), value => acc.rejected.push(value)).apply([
          f => {
            f.remark = f.name
            return f
          },
          f => {
            const [name, ext] = f.remark.split(/\.(?=[^.]+$)/)
            if (!name) {
              f.remark = `new file ${dayjs().format(DEFAULT_DATE_FORMAT)}.${ext}`
            }
            return f
          },
          isMimeTypeAllowed(allowedTypes || unAllowedMimeTypes, !!allowedTypes),
          isFileSizeAllowed("250mb")
        ])
        return acc
      },
      {allowed: [], rejected: []})


    if (rejected.length > 0) {
      setRejectedFiles(rejected.reduce((acc, {message}, i) => `${i + 1}: ${acc}. ${message}\n`))
    }

    if (allowed.length === 0) return

    const middlewareInputResult = await onFileInput(allowed)

    if (middlewareInputResult.length === 0) return

    const f = await Promise.all(middlewareInputResult.map((cur, i) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(cur);
      reader.onloadend = () => {

        resolve({
          fileData: cur,
          remark: cur.remark,
          id: uniqueId(),
          progress: 0,
          fail: false,
          size: cur.size,
          file: reader.result,
          position: position + i
        })
      }
    })))
    if (position > 0) {
      updateValue(PureDeleteItems(value, position, f.length))
    }
    setTempFiles((prevTempFiles) => multiple ? [...prevTempFiles, ...f] : f)
    await uploadFiles(f)
  }, [onFileInput, position, uploadFiles, allowedTypes, unAllowedMimeTypes, updateValue, value, multiple])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.ondragover = (e) => {
        if (!refFileOverStatus.current) {
          setOverflowedStatus(true)
        }
        e.preventDefault()
        e.stopPropagation()
      }
      containerRef.current.ondragleave = (e) => {
        setOverflowedStatus(false)
        e.preventDefault()
        e.stopPropagation()
      }
      containerRef.current.ondrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const files = []
        for (const item of e.dataTransfer.items) {
          if (item.kind === "file") {
            files.push(item.getAsFile())
          }
        }
        setOverflowedStatus(false)
        return handleInput({target: {files}})
      }
      return () => {
        if (containerRef.current) {
          containerRef.current.ondragover = null
          containerRef.current.ondragleave = null
          containerRef.current.ondrop = null
        }
      }
    }
  }, [handleInput, containerRef])

  const mergedValue = useMemo(() => {
    const tempVal = [...value]

    tempFiles.forEach((item) => {
      if (item.position) {
        tempVal.splice(item.position, 0, item)
      } else {
        tempVal.push(item)
      }
    })
    // return tempVal.map((v) => ({...v, file: `http://localhost/${v.file}`}))
    return tempVal.map((v) => ({...v, file: `${DEFAULT_URL}/${v.file}`}))
  }, [tempFiles, value])

  const onDelete = useCallback((index) => {
    const deletedValue = mergedValue[index]
    updateValue(PureDeleteItems(value, value.findIndex(v=> v.remark === deletedValue.remark)))
  },[mergedValue, updateValue, value])

  const onDeleteTempFile = useCallback((index) => {
    const deletedValue = mergedValue[index]
    setTempFiles( (prevTempFiles) => PureDeleteItems(prevTempFiles, prevTempFiles.findIndex(v=> v.id === deletedValue.id)))
  },[mergedValue])


  const onReUpload = useCallback((index) => {
    const deletedValue = mergedValue[index]
    return uploadFiles([tempFiles.findIndex(v=> v.id === deletedValue.id)])
  },[mergedValue, tempFiles, uploadFiles])


  return (
    <>
      {children({
        value: mergedValue,
        rejectedFiles: rejectedFiles,
        onEdit: focusInput,
        onDelete,
        onDeleteTempFile,
        onReUpload
      })}
      <input
        className="hidden"
        id={id}
        type="file"
        onInput={handleInput}
        multiple={multiple}
        ref={fileInputRef}
      />
    </>
  );
}

FileInputController.propTypes = {};
FileInputController.defaultProps = {
  value: [],
  unAllowedMimeTypes: [],
  onFileInput: f => f
};


export default FileInputController;
