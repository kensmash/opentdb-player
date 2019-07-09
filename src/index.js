import React, {
  useContext,
  useReducer,
  useState,
  useEffect,
  Fragment
} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
//context stuff
import GameContext from "./context";
import GameReducer from "./reducer";
//components
import ChooseCategory from "./components/ChooseCategory";
import ChooseDifficulty from "./components/ChooseDifficulty";
import GamePlay from "./components/GamePlay";

const App = () => {
  //set up global context
  const initialState = useContext(GameContext);
  const [state, dispatch] = useReducer(GameReducer, initialState);
  //set up local state
  const [category, setCategory] = useState({});
  const [difficulty, setDifficulty] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  //on component load, fetch data and update our context token and categories state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await axios.get(
          "https://opentdb.com/api_token.php?command=request"
        );
        dispatch({ type: "GET_TOKEN", payload: token.data.token });
        const categories = await axios.get(
          "https://opentdb.com/api_category.php"
        );

        dispatch({
          type: "GET_CATEGORIES",
          payload: categories.data.trivia_categories
        });

        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  //functions for updating category and difficulty state
  const setCategoryHandler = category => {
    setCategory(category);
  };

  const setDifficultyHandler = difficulty => {
    setDifficulty(difficulty);
    fetchQuestionsHandler();
  };

  const newGameHandler = () => {
    setCategory({});
    setDifficulty("");
    dispatch({
      type: "REMOVE_QUESTIONS"
    });
  };

  //update questions context
  const fetchQuestionsHandler = async () => {
    setIsLoading(true);
    let request = `https://opentdb.com/api.php?amount=7&category=${
      category.id
    }`;
    if (difficulty !== "") {
      request = `https://opentdb.com/api.php?amount=7&category=${
        category.id
      }&difficulty=${difficulty}`;
    }

    try {
      setIsLoading(false);
      const response = await axios.get(request);
      if (response.data.response_code === 0) {
        const unParsedQuestions = response.data.results.slice();
        const shuffledQuestions = unParsedQuestions.sort(
          () => Math.random() - 0.5
        );
        let parsedQuestions = [];
        shuffledQuestions.forEach(function(question) {
          const incorrectAnswers = question.incorrect_answers;
          const answersArray = incorrectAnswers.map(answer => ({
            answer: answer,
            correct: false
          }));
          const correctAnswerObject = {
            answer: question.correct_answer,
            correct: true
          };
          answersArray.push(correctAnswerObject);
          let sortedAnswers = [];
          if (answersArray.length > 2) {
            sortedAnswers = answersArray.sort(() => Math.random() - 0.5);
          } else {
            sortedAnswers = answersArray.sort(function(a, b) {
              if (a.answer < b.answer) {
                return 1;
              } else {
                return -1;
              }
            });
          }
          const questionInformation = {
            question: question.question,
            answers: sortedAnswers
          };
          parsedQuestions.push(questionInformation);
        });
        dispatch({
          type: "GET_QUESTIONS",
          payload: parsedQuestions
        });
      } else {
        //we had an error from the api
        console.log("oops", response.data.response_code);
      }
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <Fragment>
          {Object.keys(category).length === 0 && !state.questions.length && (
            <ChooseCategory
              categories={state.categories}
              setCategoryHandler={category => setCategoryHandler(category)}
            />
          )}
          {Object.keys(category).length > 0 && !state.questions.length && (
            <ChooseDifficulty
              difficulties={state.difficulties}
              setDifficultyHandler={difficulty =>
                setDifficultyHandler(difficulty)
              }
            />
          )}
          {state.questions.length > 0 && (
            <GamePlay
              questions={state.questions}
              newGameHandler={newGameHandler}
            />
          )}
        </Fragment>
      )}
    </GameContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
