import classes from "./Goals.module.css";
import GoalItem from "./GoalItem";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddGoalForm from "./actions/AddGoalForm";
import EditGoalForm from "./actions/EditGoalForm";
import { addActions } from "../../store/addSlice";
import { editActions } from "../../store/editSlice";
import { fetchGoalsDataByUserId } from "../../store/goals-actions";
import { fetchTasksDataByUserId } from "../../store/tasks-actions";
import AddButton from "./actions/AddButton";
import Layout from "../layout/Layout";
import { goalsActions } from "../../store/goalsSlice";
import { useNavigate } from "react-router-dom";

let initial = true;
const Goals = (props) => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goalList);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const goalChanged = useSelector((state) => state.goals.changed);

  const addForm = useSelector((state) => state.add);
  const editForm = useSelector((state) => state.edit);

  useEffect(() => {
    if (!user?.username) {
      navigate("/");
    }
    dispatch(fetchGoalsDataByUserId(user.id));
    dispatch(fetchTasksDataByUserId(user.id));
  }, [dispatch, user.id, navigate, user]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (goalChanged) {
      dispatch(fetchGoalsDataByUserId(user.id));
      dispatch(goalsActions.changeStatus());
    }
  }, [dispatch, goalChanged, user.id]);

  const toggleSaveFormHandler = () => {
    dispatch(addActions.toggle());
  };

  const toggleEditFormHandler = () => {
    dispatch(editActions.toggle());
  };

  //display only uncompleted goals
  return (
    <Fragment>
      <Layout />
      <div className={classes.main}>
        {goals.length === 0 ? (
          <div className={classes.noGoals}>
            <span>No goals yet...</span>
            <span className={classes.motivation}>
              Create your first goal now <br /> and be a step closer to a more
              productive day
            </span>
          </div>
        ) : (
          goals
            .filter((item) => !item.completed)
            .sort((a, b) => {
              return !a.timeline ? 1 : -1;
            })
            .sort((a, b) => {
              return new Date(a.timeline) > new Date(b.timeline) ? 1 : -1;
            })
            .map(
              (item) =>
                !item.completed && (
                  <div className={classes.goal} key={item.id}>
                    <GoalItem key={item.id} item={item} />
                  </div>
                )
            )
        )}
      </div>
      <AddButton
        onClick={() => {
          toggleSaveFormHandler();
          dispatch(addActions.setTitle("New Goal"));
        }}
      />

      {editForm.editFormIsVisible && (
        <div className={classes.modal}>
          <EditGoalForm
            onClose={toggleEditFormHandler}
            title={editForm.title}
          />
        </div>
      )}

      {addForm.addFormIsVisible && (
        <div className={classes.modal}>
          <AddGoalForm onClose={toggleSaveFormHandler} title={addForm.title} />
        </div>
      )}
    </Fragment>
  );
};
export default Goals;
