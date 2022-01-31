import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppList from "../../../../components/AppList";
import {settings} from "./tableConfig";
import axios from "axios";
import { CANDIDATE_LIST, DEFAULT_URL} from "../../../../components/APIList";

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
    const { location: { pathname }, history: { push } } = this.props
    const pathnames = pathname.split("/").filter(x => x)
    const newEmploy = pathnames[1] === "new_employ"
    const idEmploy = newEmploy ? "/" : `${pathnames[1]}/`
    axios.get(`${DEFAULT_URL}/${CANDIDATE_LIST}/${idEmploy}`)
    .then(
      (response) => {
        this.setState({
          isLoaded: true,
          items: response.data.program_details.map(({contacts_detail}) => {
            return contacts_detail
          }).flat()
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
    const newData = items.map(({ last_name, first_name, post, role, email, mobile_phone, illustration_link }) =>
      ({
        value: {
          name: `${last_name} ${first_name}`,
          role: `${post}`,
          img: illustration_link
        },
        role: `${role}`,
        contacts: {
          mail: email,
          phone: [mobile_phone]
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
        />
      </div>
    );
  }
}

Contacts.propTypes = {};

export default Contacts;
