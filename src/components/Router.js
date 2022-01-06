import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import EmptyPage from "../pages/EmptyPage";
import Appeal from "../pages/Аppeal"
import Reference from "../pages/Reference"
import Settings from "../pages/Settings"
import BlocksPage from "../pages/Blocks";
import Programs from "../pages/programs"
import RouterEmployees from "../pages/Employees";

const Router = () => (
    <Switch>
        <Route path="/programs" component={Programs}/>
        <Route path="/programs/blocks" component={BlocksPage} />
        <Route path="/employees" component={RouterEmployees} />
        <Route path="/appeal" component={Appeal} />
        <Route path="/reference" component={Reference} />
        <Route path="/settings" component={Settings} />
        <Route path="/" component={EmptyPage} />
    </Switch>
)

export default Router
