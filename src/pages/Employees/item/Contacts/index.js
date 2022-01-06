import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppList from "../../../../components/AppList";
import {settings, data} from "./fieldMap";

class Contacts extends Component {
  render() {
    return (
      <div className="flex-container p-t-24">
        <button
          className="blue btn width-m m-l-16 m-b-16"
        >
          + Добавить контакт
        </button>
        <AppList
          settings={settings}
          data={data}
          nestedKey="data"
        />
      </div>
    );
  }
}

Contacts.propTypes = {};

export default Contacts;
