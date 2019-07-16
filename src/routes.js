import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  __RouterContext
} from "react-router-dom";
import { useTransition, animated } from "react-spring";
//components
import RoundProgress from "./components/RoundProgress";
//routes
import ChooseCategory from "./routes/ChooseCategory";
import ChooseDifficulty from "./routes/ChooseDifficulty";
import GameQuestion from "./routes/GameQuestion";
//context
import GameContext from "./context";

function useRouter() {
  return useContext(__RouterContext);
}

const Routes = () => {
  const { state } = useContext(GameContext);

  const percentage = state.gameStarted
    ? state.gameEnded
      ? "100%"
      : ((state.round - 1) / state.rounds) * 100 + "%"
    : 0;

  return (
    <Router>
      <RoundProgress
        gameStarted={state.gameStarted}
        progressWidth={percentage}
      />
      <Main />
    </Router>
  );
};

const Main = () => {
  const { location } = useRouter();

  const transitions = useTransition(location, location => location.key, {
    from: {
      opacity: 0,
      position: "absolute",
      width: "100%",
      transform: "translate3d(100%, 0%, 0)"
    },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-50%, 0, 0)" }
  });

  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={item}>
        <Route exact path="/" component={ChooseCategory} />
        <Route exact path="/difficulty" component={ChooseDifficulty} />
        <Route exact path={"/question/:_id"} component={GameQuestion} />
      </Switch>
    </animated.div>
  ));
};

export default Routes;