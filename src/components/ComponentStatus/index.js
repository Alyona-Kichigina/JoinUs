import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from "prop-types"

const Status = ({data}) => {
  const [icon, setIcon] = useState("")
  const [title, setTitle] = useState("")

  const getData = useCallback(() => {
    const { adaptation_status, program_details: [detail]} = data
    const status = detail.levels_detail.length === adaptation_status.length
      ? "end"
      : adaptation_status.length === 0
        ? "wait"
        : "work"
    switch (status) {
      case "end":
        setIcon("/assets/icons/iconStatus/iconStatusEnd.svg")
        setTitle("Завершена")
        break;
      case "wait":
        setIcon("/assets/icons/iconStatus/iconStatusWait.svg")
        setTitle("Ожидание")
        break;
      case "work":
        setIcon("/assets/icons/iconStatus/iconStatusWorking.svg")
        setTitle("В процессе")
        break;
      default:
        setIcon("")
        setTitle("Error")
        break;
    }
  }, [icon, setIcon, title, setTitle, data])

  useEffect(() => {
    getData()
  })
  return (
    <div className="flex items-center">
      <img src={icon} alt="" className="p-r-8" />
      {title}
    </div>
  );
};

Status.propTypes = {
  data: PropTypes.string,
}

export default Status;
