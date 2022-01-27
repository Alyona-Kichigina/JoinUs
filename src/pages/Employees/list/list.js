import React from 'react';
import {settings} from "./TableConfig";
import AppList from "../../../components/AppList";

const List = ({data, search}) => {
  return (
    <AppList
      settings={settings}
      data={data}
      nestedKey="data"
    />
  );
};

export default List;
