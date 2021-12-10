import Status from "../../components/ComponentStatus";
import Progress from "../../components/ComponentProgress";
import CardForUser from "../../components/CardForUser";

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
    size: "5%"
  },
  {
    id: 1,
    key: "EMPLOYEES",
    component: CardForUser,
    name: "Сотрудник",
    size: "15%"
  },
  {
    id: 2,
    key: "RELEASE_DATE",
    name: "Дата выхода",
    size: "15%"
  },
  {
    id: 3,
    key: "ACTIVATION_DATE",
    name: "Дата активации",
    size: "30%"
  },
  {
    id: 4,
    key: "STATUS",
    name: "Статус",
    component: Status,
    size: "15%"
  },
  {
    id: 5,
    key: "PROGRESS",
    name: "Прогресс",
    size: "25%",
    component: Progress
  },
]

export const data = [
  {
    id: 1,
    EMPLOYEES: "",
    RELEASE_DATE: "01.03.2021",
    ACTIVATION_DATE: "03.03.2021",
    STATUS: "end",
    PROGRESS: ""
  },
  {
    id: 2,
    EMPLOYEES: "",
    RELEASE_DATE: "01.03.2021",
    ACTIVATION_DATE: "03.03.2021",
    STATUS: "end",
    PROGRESS: ""
  },
  {
    id: 3,
    EMPLOYEES: "",
    RELEASE_DATE: "01.03.2021",
    ACTIVATION_DATE: "03.03.2021",
    STATUS: "end",
    PROGRESS: ""
  }
]
