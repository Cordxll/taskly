import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import { useState } from "react";
import Card from "../ui/Card";
import CompletedTasks from "./CompletedTasks";
import classes from "./GoalItem.module.css";
import MoreButton from "./MoreButton";
import TimeClock from "../pics/time.svg";
import { goalsActions } from "../../store/goalsSlice";

const GoalItem = (props) => {
  const dispatch = useDispatch();

  const { id, title, color } = props.item;

  // const [color, setColor] = useState(classes.color1);
  const showTasks = useSelector((state) => state.ui.taskIsVisible);

  const toggleGoalHandler = () => {
    dispatch(uiActions.toggle());
  };
  const changeColorHandler = () => {
    dispatch(goalsActions.changeColor());
  };

  // const handleChange = (e) => {
  //   setColor(e.target.value);
  // };

  return (
    <Fragment>
      <Card>
        <div className={classes.goal}>
          <button
            className={classes.themeColorBtn}
            onClick={changeColorHandler}
          ></button>
          <span className={classes.headerText}>{title}</span>
          <MoreButton className={classes.moreBtn} onClick={props.onClick} />
          <img className={classes.timeClock} src={TimeClock} alt="time clock" />
          <span className={classes.goalTime}>04/15/2023</span>
          <button className={classes.itemButton} onClick={toggleGoalHandler}>
            View Tasks
          </button>
        </div>
      </Card>

      {showTasks && (
        <CompletedTasks
          className={classes.items}
          title={"Eat healthy"}
          date={"01/10/2023"}
        />
      )}
    </Fragment>
  );
};

export default GoalItem;
