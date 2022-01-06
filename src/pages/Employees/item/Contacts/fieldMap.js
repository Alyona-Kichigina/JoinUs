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
    key: "NAME",
    name: "Контакт",
    component: CardForUser,
    size: "1.5fr"
  },
  {
    id: 3,
    key: "ROLE",
    name: "Роль",
    size: "1fr"
  },
  {
    id: 4,
    key: "CONTACTS",
    name: "Контакты",
    component: CardContact,
    size: "2fr"
  }
]

export const data = [
  {
    NUMBER: 1,
    NAME: {
      img: "./assets/img/associated_photo.png",
      name: "Петрова Дарья",
      role: "Директор по техническому развитию"
    },
    ROLE: "Наставник",
    CONTACTS: {
      mail: "petrova.darya@gmail.com",
      phone: [
        "+7 999 787 7868",
        "+7 999 787 7868"
      ]
    }
  },
  {
    NUMBER: 2,
    NAME: {
      img: "./assets/img/associated_photo.png",
      name: "Петрова Дарья",
      role: "Заместитель генерального директора по статегическому развитию"
    },
    ROLE: "HR",
    CONTACTS: {
      mail: "petrova.darya@gmail.com",
      phone: [
        "+7 999 787 7868",
        "+7 999 787 7868"
      ]
    }
  },
  {
    NUMBER: 3,
    NAME: {
      img: "./assets/img/associated_photo.png",
      name: "Петрова Дарья",
      role: "Директор по техническому развитию"
    },
    ROLE: "Гуру",
    CONTACTS: {
      mail: "petrova.darya@gmail.com",
      phone: [
        "+7 999 787 7868",
        "+7 999 787 7868"
      ]
    }
  },
  {
    NUMBER: 4,
    NAME: {
      img: "./assets/img/associated_photo.png",
      name: "Петрова Дарья",
      role: "Директор по техническому развитию"
    },
    ROLE: "HR",
    CONTACTS: {
      mail: "petrova.darya@gmail.com",
      phone: [
        "+7 999 787 7868",
        "+7 999 787 7868"
      ]
    }
  },

]
