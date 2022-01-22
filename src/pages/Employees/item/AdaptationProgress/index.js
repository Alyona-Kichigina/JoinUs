import React, {Component} from 'react';
import CardIconAndTitle from "../../../../components/CardIconAndTitle";
import AppList from "../../../../components/AppList";
import {settings} from "../Goals/tableConfig";

class AdaptationProgress extends Component {
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
            title="Пройдено уровней:"
            value="1/3"
            icon="levels"
          />
        </div>
        {/*<AppList*/}
        {/*  settings={settings}*/}
        {/*  data={newData}*/}
        {/*/>*/}
      </div>
    );
  }
}

export default AdaptationProgress;
