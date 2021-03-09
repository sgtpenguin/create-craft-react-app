import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Page from "components/page";

const App = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route path="/" component={Page} />
      </Switch>
    </div>
  );
};

export default App;
