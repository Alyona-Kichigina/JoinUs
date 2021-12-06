import React from "react"

import Select from "./index"

// todo дописать описание пропсов

export default {
  title: "Components/Fields/Select",
  component: Select,
  argTypes: {
    value: {
      description: "Объект с ключом и именем файла",
    },
    onInput: {
      description: "HTML свойство обработчик события"
    },
    id: {
      description: "id компонента",
    },
    loading: {
      description: "Индикатор загрузки"
    },
    showToggleButton: {
      description: "Показывать кнопку-галку в поле",
    },
    returnOption: {
      description: "",
    },
    valueKey: {
      description: "Ключ опции",
    },
    options: {
      description: "Массив опций",
    },
    disabled: {
      description: "HTML блокировка"
    },
    allWaysOpen: {
      description: "Показывать сразу опции",
    },
    allWaysExpandedMultipleSelection: {
      description: "",
    },
    clearable: {
      description: "Показывать кнопку-крестик для удаления выбраной опции",
    },
    searchable: {
      description: "Поиск по опциям",
    },
    multiple: {
      description: "Выбор несколько даннных из опции",
    },
    remote: {
      description: "",
    },
    allowCreate: {
      description: "",
    },
    filterable: {
      description: "",
    },
    placeholder: {
      description: "Placeholder селекта",
    },
    labelKey: {
      description: "Ключ названия опции",
    },
    awaitOfUserInputLabel: {
      description: "",
    },
    tipMinSize: {
      description: "Минимальный размер типсы",
    },
    onBlur: {
      description: "HTML свойство обработчик события"
    },
    tipMaxSize: {
      description: "Максимальный размер типсы",
    },
    remoteMethod: {
      description: "",
    },
    filterBy: {
      description: "",
    },
    onFocus: {
      description: "HTML свойство обработчик события"
    },
    inputRef: {
      description: "HTML элемент"
    },
    children: {
      description: "React children",
    },
    className: {
      description: "пропс эквивалентый HTML аттрибуту",
    },
  }
}

const Template = (args) => (
  <div className="display-flex fd-column j-c-start">
    <div className="p-b-10"><Select {...args} placeholder="Select with options" /></div>
    <div className="p-b-10"><Select {...args} placeholder="Select with disabled" disabled /></div>
    <div className="p-b-10"><Select {...args} options={[]} placeholder="Select without options" /></div>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  showToggleButton: true,
  clearable: true,
  searchable: true,
  filterable: true,
  tipMinSize: "100%",
  tipMaxSize: "100%",
  awaitOfUserInputLabel: "Enter your request",
  valueKey: "ID",
  labelKey: "SYS_NAME",
  options: [{ SYS_NAME: "DAOR", ID: 2, ID_REF_DATA: 7, ID_TABLE_DATA: 42 }, { SYS_NAME: "Paid Social", ID: 3, ID_REF_DATA: 7, ID_TABLE_DATA: 42 }, { SYS_NAME: "SEM", ID: 4, ID_REF_DATA: 7, ID_TABLE_DATA: 42 }, { SYS_NAME: "AdOps", ID: 21, ID_REF_DATA: 7, ID_TABLE_DATA: 42 }, { SYS_NAME: "Trading", ID: 62, ID_REF_DATA: 7, ID_TABLE_DATA: 42 }, { SYS_NAME: "Administrator", ID: 1082, ID_REF_DATA: 7, ID_TABLE_DATA: 42 }, { SYS_NAME: "Influencer", ID: 1030, ID_REF_DATA: 7, ID_TABLE_DATA: 42 }, { SYS_NAME: "All", ID: 1061, ID_REF_DATA: 7, ID_TABLE_DATA: 42 }, { SYS_NAME: "Planning", ID: 1080, ID_REF_DATA: 7, ID_TABLE_DATA: 42 }, { SYS_NAME: "Copyright", ID: 1081, ID_REF_DATA: 7, ID_TABLE_DATA: 42 }, { SYS_NAME: "Programmatic", ID: 1024, ID_REF_DATA: 7, ID_TABLE_DATA: 42 }],
  onBlur: () => null,
  onFocus: () => null,
  inputRef: () => null,
  filterBy: (option, label, search) => label ? label.toLowerCase().indexOf(search.toLowerCase()) > -1 : false,
  className: ""
}
