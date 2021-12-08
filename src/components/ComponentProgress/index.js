import React from 'react';
import {Oval, Container} from "./style"

const Progress = () => {
  return (
    <div>
      <div className="fs-12 color-light-blue-2 p-b-6">Для руководителей проектов</div>
      <div className="flex">
        <Container>
          <Oval active/>
          <Oval active/>
          <Oval active/>
          <Oval/>
        </Container>
        <div className="fs-14 color-darken-blue fw-700 p-l-6">
          2/4
        </div>
      </div>
    </div>
  );
};

export default Progress;
