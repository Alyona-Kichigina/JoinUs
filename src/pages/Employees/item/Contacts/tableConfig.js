import CardForUser from "../../../../components/ComponentsForListTable/CardForUser";
import CardContact from "../../../../components/ComponentsForListTable/CardContact";

export const settings = [
  {
    id: 1,
    key: "number",
    name: "№",
    // component: Contact,
    size: "50px"
  },
  {
    id: 2,
    key: "value",
    name: "Контакт",
    component: CardForUser,
    size: "1.5fr"
  },
  {
    id: 3,
    key: "role",
    name: "Роль",
    size: "1fr"
  },
  {
    id: 4,
    key: "contacts",
    name: "Контакты",
    component: CardContact,
    size: "2fr"
  }
]
