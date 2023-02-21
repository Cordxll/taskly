import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import Card from "../ui/Card";
import CompletedTasks from "./CompletedTasks";
import classes from "./GoalItem.module.css";
import MoreButton from "./MoreButton";
import TimeClock from "../pics/time.svg";
import { goalsActions } from "../../store/goalsSlice";
import { editActions } from "../../store/editSlice";
import EditGoalForm from "./actions/EditGoalForm";
import { useState, useEffect } from "react";

const GoalItem = (props) => {
  const dispatch = useDispatch();

  const editForm = useSelector((state) => state.edit);

  const { id, title, color } = props.item;
  // console.log(goal);

  const toggleEditFormHandler = () => {
    console.log(props.item);
    dispatch(editActions.toggle());
    // return async (dispatch) => {
    //   await dispatch(goalsActions.changeTitle("hey"));
    // };
    return async (dispatch) => {
      await props.onClose();
    };
  };

  const showTasks = useSelector((state) => state.ui.taskIsVisible);

  const toggleGoalHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <>
      <Card>
        <div className={classes.goal}>
          <button className={classes.themeColorBtn} style={color}></button>

          <span className={classes.headerText}>{title}</span>
          <MoreButton
            className={classes.moreBtn}
            onClick={toggleEditFormHandler.bind(null, props.item.id)}
            title="Update goal"
            // goal={props.item}
          />
          <div className={classes.date}>
            <img
              className={classes.timeClock}
              src={TimeClock}
              alt="time clock"
            />
            <span className={classes.goalTime}>04/15/2023</span>
          </div>
          <button className={classes.itemButton} onClick={toggleGoalHandler}>
            View Tasks
          </button>
        </div>
      </Card>

      {showTasks && (
        <div>
          <CompletedTasks
            className={classes.items}
            title={"Eat healthy"}
            date={"01/10/2023"}
          />
        </div>
      )}

      {editForm.editFormIsVisible && (
        <div className={classes.modal}>
          <EditGoalForm
            onClose={toggleEditFormHandler.bind(null, id)}
            title={editForm.title}
            goal={props.item}
          />
        </div>
      )}
    </>
  );
};

export default GoalItem;
