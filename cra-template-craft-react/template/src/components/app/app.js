import React from "react";
import { Switch, Route } from "react-router-dom";
import Page from "components/page";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Page} />
      </Switch>
    </div>
  );
};

export default App;
