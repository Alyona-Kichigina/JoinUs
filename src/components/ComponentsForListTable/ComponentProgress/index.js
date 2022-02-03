import React, {useCallback, useEffect, useState} from 'react';
import {Oval, Container} from "./style"
import PropTypes from "prop-types"

// progress: 1
// 0/4 - 0
// 1/4 - 0,25
// 2/4 - 0,5
// 3/4 - 0,75
// 4/4 - 1
const getPoint = (data = []) => {
  let sum = 0
  data.forEach(({stages}) => {
    sum = sum + stages.length
  })
  return sum
}
// post это название программы
const Progress = ({data}) => {
  const [result, setResult] = useState(0)
  const [progress, setProgress] = useState(0)
  const { post, adaptation_status, program_details: [detail, program] } = data

  const getProgress = useCallback(() => {
    if (adaptation_status && adaptation_status.length > 0) {
      setResult(adaptation_status.length / getPoint(detail.levels_detail))
      setProgress(result >= 4 ? aaa : result)
    }
  }, [adaptation_status, detail])

  useEffect(() => {
    getProgress()
  })
  const aaa = getPoint(detail.levels_detail)
  return (
    <div>
      <div
        className="fs-12 color-light-blue-2 p-b-6"
      >
        {post}
      </div>
      <div className="flex">
        {adaptation_status.length}<br/>
        {aaa}<br/>
        {result}<br/>
        <Container>
          <Oval active={result > 0}/>
          <Oval active={result >= 0.25}/>
          <Oval active={result >= 0.5}/>
          <Oval active={result >= 1}/>
        </Container>
        <div className="fs-14 color-darken-blue fw-700 p-l-6">
          {progress}/{detail.levels_detail.length}
        </div>
      </div>
    </div>
  );
};

Progress.propTypes = {
  data: PropTypes.object,
}

Progress.defaultProps = {
  data: {
    post: "no name"
  }
}

export default Progress;
