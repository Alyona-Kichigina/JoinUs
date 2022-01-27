import React, {useRef, useEffect, useState, useCallback} from 'react';
import dayjs from "dayjs"
import axios from "axios";
import PropTypes from 'prop-types';
import { UPLOADS, DEFAULT_URL } from "../../../APIList";

import {DropConeContainer, TextContainer} from "./Styles";
import uniqueId from "lodash/uniqueId";
import Pipe from '../../../../utils/FunctionsCall/pipe'
import {DEFAULT_DATE_FORMAT} from '../../../../constants'
import { isMimeTypeAllowed, isFileSizeAllowed } from "../../../../utils/Files/FileValidation"


const FileInputContainer = ({ id, multiple, allowedTypes, unAllowedMimeTypes, value, onInput }) => {
  const fileInputRef = useRef()
  const focusInput = useCallback(() => { fileInputRef.current.click() }, [])

  const [isFileOverflowed, setOverflowedStatus] = useState(false)
  const [rejectedFiles, setRejectedFiles] = useState("")
  const [tempFiles, setTempFiles] = useState(false)
  const refFileOverStatus = useRef(isFileOverflowed)
  refFileOverStatus.current = isFileOverflowed

  const updateValue = useCallback((value) => {
    onInput(value, id)
  }, [id, onInput])

  const progressUpload = useCallback((files) => ({ loaded, total }) => {
    const filesLength = files.length
    const { f } = files.reduce((acc, { size, ...file }, i) => {
      let progress = i + 1 === filesLength ? acc.loaded : acc.loaded * (size / acc.total + (filesLength - i) / 100)
      progress = progress > size ? size : progress > 0 ? progress : 1
      acc.loaded -= progress
      acc.total -= size
      acc.f.push({ ...file, size, progress: Math.round((progress * 100) / size) })
      return acc
    }, { total, loaded, f: [] })
    setTempFiles((prevTempFiles) => prevTempFiles.map(file => f.find(newFile => newFile.id === file.id) || file))
  }, [])

  const uploadFiles = useCallback(async (files) => {
    try {
      const FData = new FormData()
      files.forEach(({ fileData }) => {
        FData.append(fileData.VALUE || fileData.name, fileData, fileData.VALUE || fileData.name)
      })
      const downloadedFiles = await axios.post(`${DEFAULT_URL}/${UPLOADS}/`, FData, {
        onUploadProgress: progressUpload(files),
      })
      updateValue(multiple ? [...value, ...downloadedFiles] : downloadedFiles)
      fileInputRef.current.value = ""
    } catch (e) {
      setTempFiles((prevTempFiles) => prevTempFiles
        .map((item) => (item.id ? { ...item, progress: undefined, fail: true } : item
      )))
    }
  }, [multiple, updateValue, value, progressUpload])

  const handleInput = useCallback(async ({ target: { files } }) => {
    const { allowed, rejected } = Object.values(files).reduce((acc, file) => {
        new Pipe(file, value => acc.allowed.push(value), value => acc.rejected.push(value)).apply([
          f => {
            f.VALUE = f.name
            return f
          },
          f => {
            const [name, ext] = f.VALUE.split(/\.(?=[^.]+$)/)
            if (!name) {
              f.VALUE = `new file ${dayjs().format(DEFAULT_DATE_FORMAT)}.${ext}`
            }
            return f
          },
          isMimeTypeAllowed(allowedTypes || unAllowedMimeTypes, !!allowedTypes),
          isFileSizeAllowed("250mb")
        ])
        return acc
      },
      { allowed: [], rejected: [] })

    if (rejected.length > 0) {
      setRejectedFiles(rejected.reduce((acc, { message }, i) => `${i + 1}: ${acc}. ${message}\n`))
    }
    if (allowed.length === 0) return
    
    const f = allowed.reduce((acc, cur) => [
      ...acc,
      {
        fileData: cur,
        VALUE: cur.VALUE,
        id: uniqueId(),
        progress: 0,
        fail: false,
        size: cur.size
      }
    ], [])

    setTempFiles((prevTempFiles) => multiple ? [...prevTempFiles, ...f] : f)
    await uploadFiles(f)
  }, [allowedTypes, multiple, unAllowedMimeTypes, uploadFiles])

  useEffect(() => {
    document.body.ondragover = (e) => {
      if (!refFileOverStatus.current) {
        setOverflowedStatus(true)
      }
      e.preventDefault()
      e.stopPropagation()
    }
    document.body.ondragleave = (e) => {
      setOverflowedStatus(false)
      e.preventDefault()
      e.stopPropagation()
    }
    document.body.ondrop = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const files = []
      for (const item of e.dataTransfer.items) {
        if (item.kind === "file") {
          files.push(item.getAsFile())
        }
      }
      handleInput({ target: { files } })
      setOverflowedStatus(false)
    }
    return () => {
      document.body.ondragover = null
      document.body.ondragleave = null
      document.body.ondrop = null
    }
  }, [handleInput])

  return (
    <div>
      <DropConeContainer onClick={focusInput}>
        <TextContainer>
          Нажмите сюда для поиска файлов или
          <span className={isFileOverflowed ? "color-blue" : "color-light-blue-2"}> перетащите файлы в зону</span>
        </TextContainer>
        <input
          className="hidden"
          id={id}
          type="file"
          onInput={handleInput}
          multiple={multiple}
          ref={fileInputRef}
        />
      </DropConeContainer>
      {rejectedFiles && <div className="color-pink mt-4">
        <div className="color-darken-blue fs-16 mb-2 fw-700">Следующие файлы не были загруженны:</div>
        <text className="">{rejectedFiles}</text>
      </div>}
    </div>
  );
};

FileInputContainer.propTypes = {
  
};

FileInputContainer.defaultProps = {
  value: [],
};

export default FileInputContainer;