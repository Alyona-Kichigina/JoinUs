import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppList from "../../../../components/AppList";
import {settings, data} from "./fieldMap";
import axios from "axios";
import {CONTACTS, DEFAULT_URL} from "../../../../components/APIList";

class Contacts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      isLoaded: false,
      items: []
    }
  }
  componentDidMount() {
    axios.get(`${DEFAULT_URL}/${CONTACTS}`)
    .then(
      (response) => {
        this.setState({
          isLoaded: true,
          items: response.data
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    )
  }
  render() {
    const { items = [] } = this.state
    const newData = items.map(({ last_name, first_name, post, role }) =>
      ({
        value: {
          name: `${last_name} ${first_name}`,
          role: `${post}`
        },
        role: `${role}`,
        contacts: {
          mail: "petrova.darya@gmail.com",
          phone: [
            "+7 999 787 7868",
            "+7 999 787 7868"
          ]
        }
      })
    )
    return (
      <div className="flex-container p-t-24">
        <button
          className="blue btn width-m m-l-16 m-b-16"
        >
          + Добавить контакт
        </button>
        <AppList
          settings={settings}
          data={newData}
          nestedKey="data"
        />
      </div>
    );
  }
}

Contacts.propTypes = {};

export default Contacts;
