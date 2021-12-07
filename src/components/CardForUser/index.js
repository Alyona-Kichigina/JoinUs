import React from 'react';

const CardForUser = () => {
  return (
    <div className="flex">
      <div className="items-center flex">
        <img src="./assets/img/associated_photo.png" alt=""/>
      </div>
      <div className="p-l-12">
        <div className="color-darken-blue fs-14 lh-19">Петрова Дарья</div>
        <div className="color-light-blue-2 fs-12">Директор по техническому развитию</div>
      </div>
    </div>
  );
};

export default CardForUser;
