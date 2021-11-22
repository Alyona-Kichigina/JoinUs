import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Levels from "../pages/levels";
import Programs from "../pages/programs";
import EmptyPage from "../pages/EmptyPage";

const Router = () => (
    <Switch>
        <Route exact path="/programs/levels" component={Levels} />
        <Route path="/programs" component={Programs} />
        <Route path="/" component={EmptyPage} />
    </Switch>
)

export default Router
