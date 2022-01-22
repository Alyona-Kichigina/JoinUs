import Status from "../../../../components/ComponentStatus";

export const settings = [
  {
    id: 11,
    key: "number",
    name: "№",
    size: "50px"
  },
  {
    id: 1,
    key: "goal_name",
    name: "Наименование",
    size: "1fr"
  },
  {
    id: 2,
    key: "STATUS",
    name: "Статус",
    size: "2fr",
    component: Status,
  },
]
