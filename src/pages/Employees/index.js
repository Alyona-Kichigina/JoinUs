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


class RouterEmployees extends Component {
  render() {
  const { props: { location: { pathname } } } = this
    const pathnames = pathname.split("/").filter(x => x)
    const nameEmploy = pathnames[1] === "new_employ" ? "Новый сотрудник" : pathnames[2]
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
                pageData={nameEmploy}
                url="employees"
                links={EMPLOYEES_TAB}
              >
                <Route path="/employees/new_employ/general" component={General} />
                <Route path="/employees/new_employ/contacts" component={Contacts}/>
                <Route path="/employees/new_employ/adaptation_progress" component={AdaptationProgress}/>
                <Route path="/employees/new_employ/documents" component={Documents}/>
                <Route path="/employees/new_employ/goals" component={Goals}/>

                <Route path="/employees/:employID/:employName/general" component={General} />
                <Route path="/employees/:employID/:employName/contacts" component={Contacts}/>
                <Route path="/employees/:employID/:employName/adaptation_progress" component={AdaptationProgress}/>
                <Route path="/employees/:employID/:employName/documents" component={Documents}/>
                <Route path="/employees/:employID/:employName/goals" component={Goals}/>
              </PageHeader>
            )
        }
      </div>
    );
  }
}

export default RouterEmployees;
