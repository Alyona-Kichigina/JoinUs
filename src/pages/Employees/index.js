import React, {Component} from 'react';
import {Route} from "react-router-dom";
import Contacts from "./item/Contacts";
import AdaptationProgress from "./item/AdaptationProgress";
import Documents from "./item/Documents";
import Goals from "./item/Goals";
import Employees from "./list";
import General from "./item/General";
import {EMPLOYEES_TAB} from "./item/Constants";
import PageHeader from "../../components/PageHeader";
import {programsBreadcrumbs} from "./config";

const pageData = {
  pageName: "Новый сотрудник"
}

class RouterEmployees extends Component {
  render() {
  const { props: { location: { pathname } } } = this
    return (
      <div className="flex-container">
        {
          pathname === "/employees"
            ?
            (
              <Route path="/employees" component={Employees} />
            )
            :
            (
              <PageHeader
                {...this.props}
                bredCrumbsConfig={programsBreadcrumbs}
                pageData={pageData}
                url="employees"
                links={EMPLOYEES_TAB}
              >
                <Route path="/employees/new_employ/general" component={General} />
                <Route path="/employees/new_employ/contacts" component={Contacts}/>
                <Route path="/employees/new_employ/adaptation_progress" component={AdaptationProgress}/>
                <Route path="/employees/new_employ/documents" component={Documents}/>
                <Route path="/employees/new_employ/goals" component={Goals}/>
                <Route path="/employees/:employID/general" component={General} />
              </PageHeader>
            )
        }
      </div>
    );
  }
}

export default RouterEmployees;
