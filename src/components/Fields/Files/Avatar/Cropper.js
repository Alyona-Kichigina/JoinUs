import React, { useState, useRef, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import Cropper from "cropperjs"
import "cropperjs/src/css/cropper.css"
import {useWatch} from "../../../../utils/hooks/useWatch";
import CropperZoomBar from "./CropperZoomBar"

const CropperComponent = ({ options, bindSubmitFunction, userStartRatio }) => {
  const imageRef = useRef()
  const refStartRatio = useRef()
  const cropper = useRef({})
  const [zoom, editZoom] = useState(0)
  const [startRatio, editStartRatio] = useState(0)

  useEffect(() => {
    refStartRatio.current = startRatio
  }, [startRatio])

  const initStartZoom = useCallback(() => {
    cropper.current.zoomTo(0)
  }, [])

  const handleZoom = useCallback((e) => {
    const { detail: { oldRatio, ratio } } = e
    if (refStartRatio.current === undefined) {
      editStartRatio(oldRatio)
      e.preventDefault()
    } else if (e.detail.originalEvent) {
      let nextRatio = (ratio - refStartRatio.current) * 20000
      if (nextRatio > 0) {
        nextRatio = Math.cbrt(nextRatio)
        editZoom(nextRatio > 100 ? 100 : nextRatio)
      }
      e.preventDefault()
    }
  }, [])

  useEffect(() => {
    bindSubmitFunction(() => new Promise((resolve) => cropper.current
      .getCroppedCanvas({
        width: 380,
        height: 380,
        fillColor: "#fff",
        imageSmoothingEnabled: false,
        imageSmoothingQuality: "high"
      })
      .toBlob((blob) => {
        resolve(blob)
      })))
  }, [bindSubmitFunction])

  useEffect(() => {
    cropper.current = new Cropper(imageRef.current, {
      viewMode: 1,
      ready: initStartZoom,
      zoom: handleZoom,
      dragMode: "move",
      autoCropArea: 0,
      aspectRatio: 1,
      movable: true,
      strict: false,
      background: false,
      guides: false,
      highlight: false,
      dragCrop: false,
      checkOrientation: true,
      cropBoxResizable: false
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useWatch(zoom, (nextVal, prevVal) => {
    if (prevVal !== undefined) {
      cropper.current.zoomTo((zoom * zoom * zoom) / 20000 + refStartRatio.current + userStartRatio)
    }
  })

  return (
    <div className="flex-container overflow-hidden">
      <img
        style={{maxWidth: "360px"}}
        id="image"
        src={options[0]}
        alt=""
        ref={imageRef}
        className="max-width-100 display-block"
      />
      <div className="m-t-20 display-flex">
        <CropperZoomBar onInput={editZoom} value={zoom} className="ml-auto mr-auto" />
      </div>
    </div>
  )
}

CropperComponent.propTypes = {
  options: PropTypes.array,
  bindSubmitFunction: PropTypes.func.isRequired,
  userStartRatio: PropTypes.number,
}
CropperComponent.defaultProps = {
  userStartRatio: 0
}

export default CropperComponent
