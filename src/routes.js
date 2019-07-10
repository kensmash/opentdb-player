import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//routes
import ChooseCategory from "./routes/ChooseCategory";

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={ChooseCategory} />
          <Route exact path="/two" component={Two} />
          <Route exact path="/three" component={Three} />
        </Switch>
      </div>
    </Router>
  );
};

const Two = () => {
  return (
    <div className="page-route two">
      <h1>Two</h1>
    </div>
  );
};
const Three = () => {
  return (
    <div className="page-route three">
      <h1>Three</h1>
    </div>
  );
};

export default Routes;
