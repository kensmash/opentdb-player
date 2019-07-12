import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  __RouterContext
} from "react-router-dom";
import { useTransition, animated } from "react-spring";
//routes
import ChooseCategory from "./routes/ChooseCategory";

function useRouter() {
  return useContext(__RouterContext);
}

const Routes = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const { location } = useRouter();

  const transitions = useTransition(location, location => location.key, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch>
        <Route exact path="/" component={ChooseCategory} />
        <Route exact path="/two" component={Two} />
        <Route exact path="/three" component={Three} />
      </Switch>
    </animated.div>
  ));
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
