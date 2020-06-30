import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { getUser } from "selectors";
import { RootState } from "types";
import { TodoTasks, NoMatchPage, Authorization, Registration } from "pages";

const LoginRout: React.FC = () => {
  const user = useSelector((state: RootState) => getUser(state));
  if (user.id) {
    return <Redirect to="/" />;
  }
  return (
    <Switch>
      <Route exact path="/login/sign_in" component={Authorization} />
      <Route exact path="/login/sign_up" component={Registration} />
    </Switch>
  );
};

const Router: React.FC = () => {
  return (
    <>
      <LoginRout />
      <Switch>
        <Route exact path="/" component={TodoTasks} />
        <Route component={NoMatchPage} />
      </Switch>
    </>
  );
};

export default Router;
