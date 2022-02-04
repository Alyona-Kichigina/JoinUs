import React from 'react';
import PropTypes from "prop-types"

const ImgStyle = {
  width: "24px",
  height: "24px",
  minWidth: "24px",
  minHeight: "24px"
}

const CardForUser = ({data}) => {
  const { role, name, img } = data
  return (
    <div className="flex">
      <div className="items-center flex">
        <img
          style={ImgStyle}
          src={img ? img : "../assets/img/associated_photo.png"}
          alt=""
        />
      </div>
      <div className="p-l-12">
        <div
          className="color-darken-blue fs-14 lh-19"
        >
          {name}
        </div>
        <div
          className="color-light-blue-2 fs-12"
        >
          {role}
        </div>
      </div>
    </div>
  );
};

CardForUser.propTypes = {
  data: PropTypes.object,
}

CardForUser.defaultProps = {
  data: {}
}

export default CardForUser;
