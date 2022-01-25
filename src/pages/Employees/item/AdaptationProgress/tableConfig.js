import Status from "../../../../components/ComponentStatus";
import DisplayDate from "../../../../components/Fields/DisplayDate";

export const settings = [
  {
    id: 1,
    key: ["level_name", "stage_name"],
    name: "Уровень/Этап",
    size: "2fr"
  },
  {
    id: 2,
    key: "duration_day",
    name: "Дней этапа",
    nestedLevel: 1,
    size: "150px"
  },
  {
    id: 3,
    key: "point",
    name: "Баллов",
    nestedLevel: 1,
    size: "150px"
  },
  {
    id: 4,
    key: "create_date",
    name: "Дата прохождения",
    nestedLevel: 1,
    size: "1fr",
    component: DisplayDate
  },
  {
    id: 5,
    key: "STATUS",
    name: "Статус",
    nestedLevel: 1,
    size: "1fr",
    component: Status,
  },
  {
    id: 5,
    key: "comment",
    name: "Комментарий",
    nestedLevel: 1,
    size: "1fr"
  },
]
