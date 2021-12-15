import CardForUser from "../../../components/CardForUser";
import React from "react";

const ContactsComp = ({data}) => {
  return (
    <div>
      {
        data.phone.map( a => (
          <div
            className="flex j-c-start mb-1"
          >
            { a }
          </div>
        ))
      }
      <div className="flex j-c-start text-xs font-semibold color-light-blue-2">
        { data.mail }
      </div>
    </div>
  )
}

export const settings = [
  {
    id: 1,
    key: "value",
    name: "Контакт",
    component: CardForUser,
    size: "50%"
  },
  {
    id: 2,
    key: "role",
    name: "Роль",
    size: "30%"
  },
  {
    id: 3,
    key: "contacts",
    name: "Контакты",
    component: ContactsComp,
    size: "30%"
  }
]

export const data = [
  {
    value: {
      name: "Петрова Дарья",
      role: "Директор по техническому развитию"
    },
    role: "Наставник",
    contacts: {
      id: 1,
      mail: "petrova.darya@gmail.com",
      phone: [
        "+7 999 787 7868"
      ]
    }
  },
  {
    value: {
      name: "Егоров Михаил",
      role: "Заместитель генерального директора по стратегическому развитию"
    },
    role: "HR",
    contacts: {
      id: 2,
      mail: "petrova.darya@gmail.com",
      phone: [
        "+7 999 787 7868"
      ]
    }
  },
  {
    value: {
      name: "Петрова Дарья",
      role: "Директор по техническому развитию"
    },
    role: "Гуру",
    contacts: {
      id: 3,
      mail: "petrova.darya@gmail.com",
      phone: [
        "+7 999 787 7868",
        "+7 999 787 7868"
      ]
    }
  },
]


