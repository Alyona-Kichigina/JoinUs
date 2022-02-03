import Status from "../../../components/ComponentStatus";
import Progress from "../../../components/ComponentsForListTable/ComponentProgress";
import CardForUser from "../../../components/ComponentsForListTable/CardForUser";
import DisplayDate from "../../../components/Fields/DisplayDate";
import {NavLink} from "react-router-dom";

export const settings = [
  // это надо добавить в компонент таблицы, чтобы была дополнительная колонка с нумерацией
  // {
  //   id: 1,
  //   key: "number",
  //   name: "№",
  //   size: "30%"
  // },
  {
    id: 11,
    key: "number",
    name: "№",
    // component: numberComponent,
    size: "50px"
  },
  {
    id: 1,
    key: "EMPLOYEES",
    allData: true,
    component: ({data: { id, EMPLOYEES: {name}, EMPLOYEES }}) => {
      return (
        <NavLink
          to={`/employees/${id}/${name}/general`}
        >
          <CardForUser data={EMPLOYEES} addHover/>
        </NavLink>
      )
    },
    name: "Сотрудник",
    size: "2fr"
  },
  {
    id: 2,
    key: "release_date",
    name: "Дата выхода",
    size: "1fr",
    component: DisplayDate
  },
  {
    id: 3,
    key: "create_date",
    name: "Дата активации",
    size: "1fr",
    component: DisplayDate
  },
  {
    id: 4,
    key: "STATUS",
    name: "Статус",
    component: Status,
    size: "1fr"
  },
  {
    id: 5,
    key: "PROGRESS",
    name: "Прогресс",
    size: "1.2fr",
    component: Progress
  }
]
