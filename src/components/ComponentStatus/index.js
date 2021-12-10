import React, {useState, useCallback, useEffect} from 'react';

const Status = ({value}) => {
  const [icon, setIcon] = useState("")
  const [title, setTitle] = useState("")
  console.log(value)

  const getData = useCallback(() => {
    switch (value) {
      case "end":
        setIcon("/assets/icons/iconStatus/iconStatusEnd.svg")
        setTitle("Завершена")
        break;
      case "wait":
        setIcon("/assets/icons/iconStatus/iconStatusWait.svg")
        setTitle("Ожидание")
        break;
      case "work":
        setIcon("/assets/icons/iconStatus/iconStatusWait.svg")
        setTitle("В процессе")
        break;
      default:
        setIcon("")
        setTitle("Error")
        break;
    }
  }, [icon, setIcon, title, setTitle, value])

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

export default Status;
