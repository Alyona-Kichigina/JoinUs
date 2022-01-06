import React from 'react';
import {Oval, Container} from "./style"

// progress: 1
// 0/4 - 0
// 1/4 - 0,25
// 2/4 - 0,5
// 3/4 - 0,75
// 4/4 - 1


const Progress = ({data}) => {
  const { name, progress } = data
  const result = progress/4
  return (
    <div>
      <div
        className="fs-12 color-light-blue-2 p-b-6"
      >
        {name}
      </div>
      <div className="flex">
        <Container>
          <Oval active={result >= 0.25}/>
          <Oval active={result >= 0.5}/>
          <Oval active={result >= 0.75}/>
          <Oval active={result >= 1}/>
        </Container>
        <div className="fs-14 color-darken-blue fw-700 p-l-6">
          {progress}/4
        </div>
      </div>
    </div>
  );
};

export default Progress;
