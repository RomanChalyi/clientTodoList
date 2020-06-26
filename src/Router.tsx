import React from "react";
import { Route, Switch } from "react-router-dom";
import { TodoTasks, NoMatchPage, Authorization, Registration } from "pages";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={TodoTasks} />
      <Route exact path="/login/sign_in" component={Authorization} />
      <Route exact path="/login/sign_up" component={Registration} />
      <Route component={NoMatchPage} />
    </Switch>
  );
};

export default Router;
