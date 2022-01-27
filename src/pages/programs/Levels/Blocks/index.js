import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import ScrollBar from "@Components/ScrollBar"
import {
  HEADER_TYPE, TEXT_TYPE, VIDEO_TYPE, PHOTO_TYPE, FORM_TYPE, QUIZ_TYPE, SMILE_TYPE,
  componentTypeList
} from './constants'
import {ADAPTATION_BLOCK, ADAPTATION_GOALS, DEFAULT_URL} from "../../../../components/APIList";
import PureUpdateArrayItems from "../../../../utils/Arrays/PureUpdateArrayItems";
import {DIRECTION_UP} from "../../../../constants";
import PureDeleteItems from "../../../../utils/Arrays/PureDeleteItems";
import NewBlock from "./Components/NewBlock";
// http://51.250.15.127:9000/api-active/candidate/api-active/adaptationstage/
const Blocks = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      // const {data} = await axios.get(`${DEFAULT_URL}/${ADAPTATION_BLOCK}/`)
      // setData(data)
      setData([
        {
          type: HEADER_TYPE,
          headerType: "H1",
          text: "textHeader"
        },
        {
          type: TEXT_TYPE,
          headerType: "Код",
          text: "programs/Программа для разработчиков/1/1/stage/blocks"
        },
        {
          type: VIDEO_TYPE,
          entity: ["http://localhost/files/test.mp4", "http://localhost/files/test.mp4"]
        },
        {
          type: PHOTO_TYPE,
          entity: ["http://localhost/files/Screenshot_1.png", "http://localhost/files/CAM00475.jpg"]
        },
        {
          type: FORM_TYPE,
          fieldCount: 3,
          text: "textHeader"
        },
        {
          type: QUIZ_TYPE,
          entity: ["Вариант 1", "Вариант 2"],
          text: "textHeader"
        },
        {
          type: SMILE_TYPE,
          entity: [0, 2, 7],
          text: "textHeader"
        },

      ])
    })()
  }, [])

  const handleInput = useCallback((fieldValue, index) => {
    setData((prevData) => PureUpdateArrayItems(prevData, index - 1, fieldValue))
  }, [])

  const handleMoveItem = useCallback((direction, position) => {
    setData((prevData) => {
      const nextData = [...prevData]
      let actualPosition = position - 1
      if (direction === DIRECTION_UP) {
        if (position > 0) {
          const movedItem = nextData.splice(actualPosition, 1)
          nextData.splice(actualPosition - 1, 0 , movedItem[0])
        }
      } else {
        if (position < nextData.length - 1) {
          const movedItem = nextData.splice(actualPosition, 1)
          nextData.splice(actualPosition + 1, 0 , movedItem[0])
        }
      }
      return nextData
    })
  }, [])

  const handleDelete = useCallback((fieldValue, index) => {
    setData((prevData) => PureDeleteItems(prevData, index - 1))
  }, [])

  const handleCreate = useCallback((type) => {
    setData((prevData) => [...prevData, { type }])
  }, [])

  return (
    <ScrollBar className="p-l-24 p-r-24 p-b-24 p-t-24">
      {
        data.map((value, index) => {
          const Component = componentTypeList[value.type]
          return (
            <Component
              key={index}
              value={value}
              position={index + 1}
              onInput={handleInput}
              className={index === 0 ? "" : "mt-10"}
              onMove={handleMoveItem}
              onDelete={handleDelete}
              environmentState={data}
            />
          )
        })
      }
      <NewBlock
        className="mt-10"
        position={data.length + 1}
        onInput={handleCreate}
      />
    </ScrollBar>
  );
};

Blocks.propTypes = {};

export default Blocks;