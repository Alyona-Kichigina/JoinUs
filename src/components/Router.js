import React from "react"
import { Route, Switch } from "react-router-dom"
import App from "../App"
import Levels from "../pages/levels";
import Programs from "../pages/programs";

const Router = () => (
    <Switch>
        <Route path="/levels" component={Levels} />
        <Route path="/programs" component={Programs} />
        <Route path="/" component={App} />
    </Switch>
)

export default Router
