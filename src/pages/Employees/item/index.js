import React, {Component} from 'react';
import PageHeader from "../../../components/PageHeader";
import {EMPLOYEES_TAB} from "./Constants";

const pageData = {
  pageName: "Новый сотрудник"
}

class Employ extends Component {
  render() {
    return (
      <PageHeader
        {...this.props}
        url="employees"
        links={EMPLOYEES_TAB}
        pageData={pageData}
      >
      </PageHeader>
    );
  }
}

export default Employ;
