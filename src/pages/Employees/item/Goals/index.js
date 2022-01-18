import React, {Component} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import AppList from "../../../../components/AppList";
import {settings, data} from "./tableConfig";

class Goals extends Component {
  render() {
    return (
      <div className="flex-container hidden">
        <div className="flex p-t-16 p-r-16 p-l-16">
          <CardIconAndTitle
            title="Выполнено целей:"
            value="800"
            icon="points"
            className="m-r-16"
          />
          <CardIconAndTitle
            title="Всего документов:"
            value="1/3"
            icon="goals"
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

export default Goals;
