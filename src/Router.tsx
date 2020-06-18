import React from "react";
import { Route, Switch } from "react-router-dom";
import { TodoTasks, NoMatchPage, Authorization } from "pages";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={TodoTasks} />
      <Route
        exact
        path="/login/sign_in"
        render={(props) => <Authorization isSignIn />}
      />
      <Route exact path="/login/sign_up" component={Authorization} />
      <Route component={NoMatchPage} />
    </Switch>
  );
};

export default Router;
