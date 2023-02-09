import { useDispatch } from "react-redux";

import { uiActions } from "../../store/uiSlice";
import classes from "./GoalButton.module.css";

const GoalButton = (props) => {
  const dispatch = useDispatch();

  const toggleGoalHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleGoalHandler}>
      <span>View Tasks</span>
    </button>
  );
};

export default GoalButton;
