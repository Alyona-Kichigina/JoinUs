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
    component: CardForUser,
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
  },
  {
    id: 6,
    // name: "",
    allData: true,
    size: "200px",
    component: ({data: { id, EMPLOYEES: {name} }}) => {
      return (
        <NavLink
          to={`/employees/${id}/${name}/general`}
          className="btn width-m blue"
        >
          Просмотр
        </NavLink>
      )
    }
  }
]

export const data = [
  {
    id: 1,
    EMPLOYEES: {
      img: "./assets/img/associated_photo.png",
      name: "Петрова Дарья",
      role: "Директор по техническому развитию"
    },
    RELEASE_DATE: "01.03.2021",
    ACTIVATION_DATE: "03.03.2021",
    STATUS: "end",
    PROGRESS: {
      name: "Для руководителей проектов",
      progress: 1
    }
  },
  {
    id: 2,
    EMPLOYEES: {
      img: "./assets/img/associated_photo.png",
      name: "Петрова Дарья",
      role: "Заместитель генерального директора по статегическому развитию"
    },
    RELEASE_DATE: "01.03.2021",
    ACTIVATION_DATE: "03.03.2021",
    STATUS: "wait",
    PROGRESS: {
      name: "Для менеджеров",
      progress: 2
    }
  },
  {
    id: 3,
    EMPLOYEES: {
      img: "./assets/img/associated_photo.png",
      name: "Петрова Дарья",
      role: "Директор по техническому развитию"
    },
    RELEASE_DATE: "01.03.2021",
    ACTIVATION_DATE: "03.03.2021",
    STATUS: "work",
    PROGRESS: {
      name: "Для руководителей проектов",
      progress: 3
    }
  },
  {
    id: 4,
    EMPLOYEES: {
      img: "./assets/img/associated_photo.png",
      name: "Петрова Дарья",
      role: "Директор по техническому развитию"
    },
    RELEASE_DATE: "01.03.2021",
    ACTIVATION_DATE: "03.03.2021",
    STATUS: "work",
    PROGRESS: {
      name: "Для руководителей проектов",
      progress: 4
    }
  },
  {
    id: 5,
    EMPLOYEES: {
      img: "./assets/img/associated_photo.png",
      name: "Петрова Дарья",
      role: "Директор по техническому развитию"
    },
    RELEASE_DATE: "01.03.2021",
    ACTIVATION_DATE: "03.03.2021",
    STATUS: "work",
    PROGRESS: {
      name: "Для руководителей проектов",
      progress: 0
    }
  }
]
