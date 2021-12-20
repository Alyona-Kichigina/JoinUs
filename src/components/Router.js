import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Levels from "../pages/programs/levels";
import Programs from "../pages/programs";
import EmptyPage from "../pages/EmptyPage";
import Employees from "../pages/Employees";
import Appeal from "../pages/Аppeal"
import Reference from "../pages/Reference"
import Settings from "../pages/Settings"
import Contacts from "../pages/programs/Contacts"
import Documents from "../pages/programs/Documents";
import Goals from "../pages/programs/Goals";
import NewProgramm from "../pages/programs/NewProgramm";

const Router = () => (
    <Switch>
        <Route exact path="/programs/:programName/levels" component={Levels} />
        <Route path="/programs/:programName/contacts" component={Contacts} />
        <Route path="/programs/:programName/documents" component={Documents} />
        <Route path="/programs/:programName/goals" component={Goals} />
        <Route path="/programs/:programName/general" component={NewProgramm} />
        <Route exact path="/programs/levels" component={Levels} />
        <Route path="/programs/contacts" component={Contacts} />
        <Route path="/programs/documents" component={Documents} />
        <Route path="/programs/goals" component={Goals} />
        <Route path="/programs/new_programm/general" component={NewProgramm} />
        <Route path="/programs" component={Programs} />
        <Route path="/employees" component={Employees} />
        <Route path="/appeal" component={Appeal} />
        <Route path="/reference" component={Reference} />
        <Route path="/settings" component={Settings} />
        <Route path="/" component={EmptyPage} />
    </Switch>
)

export default Router
