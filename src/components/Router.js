import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Levels from "../pages/levels";
import Programs from "../pages/programs";
import EmptyPage from "../pages/EmptyPage";
import Employees from "../pages/Employees";
import Appeal from "../pages/Аppeal"
import Reference from "../pages/Reference"
import Settings from "../pages/Settings"
import Contacts from "../pages/Contacts"

const Router = () => (
    <Switch>
        <Route exact path="/programs/levels" component={Levels} />
        <Route path="/programs/contacts" component={Contacts} />
        <Route path="/programs" component={Programs} />
        <Route path="/employees" component={Employees} />
        <Route path="/appeal" component={Appeal} />
        <Route path="/reference" component={Reference} />
        <Route path="/settings" component={Settings} />
        <Route path="/" component={EmptyPage} />
    </Switch>
)

export default Router
