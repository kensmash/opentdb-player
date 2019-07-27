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
import Intro from "./routes/Intro";
import ChooseCategory from "./routes/ChooseCategory";
import ChooseDifficulty from "./routes/ChooseDifficulty";
import ConfirmGame from "./routes/ConfirmGame";
import GameQuestion from "./routes/GameQuestion";
import GameSummary from "./routes/GameSummary";
//context
import GameContext from "./context";

function useRouter() {
  return useContext(__RouterContext);
}

const Routes = () => {
  const { state } = useContext(GameContext);
  const percentage =
    state.round >= 1
      ? state.gameEnded === true
        ? "100%"
        : ((state.round - 1) / state.rounds) * 100 + "%"
      : 0;

  //console.log("percentage", percentage, state.gameStarted);
  return (
    <Router>
      <RoundProgress
        gameStarted={state.round >= 1}
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
      transform: "translate3d(100%, 0%, 0) scale(0.7)"
    },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0) scale(1)" },
    leave: { opacity: 0, transform: "translate3d(-50%, 0, 0) scale(0.7)" }
  });

  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={item}>
        <Route exact path="/" component={Intro} />
        <Route exact path="/category" component={ChooseCategory} />
        <Route exact path="/difficulty" component={ChooseDifficulty} />
        <Route exact path="/confirmgame" component={ConfirmGame} />
        <Route exact path={"/question/:_id"} component={GameQuestion} />
        <Route exact path="/summary" component={GameSummary} />
      </Switch>
    </animated.div>
  ));
};

export default Routes;
