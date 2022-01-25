import React, {useCallback, useEffect, useState} from 'react';
import {ContainerCard, CircleForIcon} from "./style"
import PropTypes from 'prop-types';

const CardIconAndTitle = ({title, icon, value, className}) => {
  const [img, setImg] = useState("")

  const getIcon = useCallback(() => {
    switch (icon) {
      case "points":
        setImg("/assets/icons/promotions.svg")
        break;
      case "documents":
        setImg("/assets/icons/document.svg")
        break;
      case "goals":
        setImg("/assets/icons/goals.svg")
        break;
      case "levels":
        setImg("/assets/icons/stairs.svg")
        break;
      default:
        setImg("")
        break;
    }
  }, [icon, setImg])
  useEffect(() => {
    getIcon()
  })
  return (
    <ContainerCard className={className}>
      <CircleForIcon>
        <img src={img} alt=""/>
      </CircleForIcon>
      <div className="p-l-8">
        <div className="fs-12 color-light-blue-2 lh-16 ls-01">
          {title}
        </div>
        <div className="fs-16 fw-700 ls-01">
          {
            Array.isArray(value)
            ? `${value[0]}/${value[1]}`
            : value
          }
        </div>
      </div>
    </ContainerCard>
  );
};

CardIconAndTitle.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array,]),
  className: PropTypes.string,
  icon: PropTypes.string,
}

export default CardIconAndTitle;
