import React, {Component} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import {data, settings} from "./tableConfig";
import AppList from "../../../../components/AppList";

class Documents extends Component {
  render() {
    return (
      <div className="flex-container hidden">
        <div className="flex p-t-16 p-r-16 p-l-16">
          <CardIconAndTitle
            title="Заработано баллов:"
            value="800"
            icon="points"
            className="m-r-16"
          />
          <CardIconAndTitle
            title="Всего документов:"
            value="3"
            icon="documents"
          />
        </div>
        <AppList
          settings={settings}
          data={data}
        />
      </div>
    );
  }
}

export default Documents;
