import classes from "./Goals.module.css";
import GoalItem from "./GoalItem";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddGoalForm from "./actions/AddGoalForm";
import EditGoalForm from "./actions/EditGoalForm";
import { addActions } from "../../store/addSlice";
import { editActions } from "../../store/editSlice";
import { fetchGoalsData } from "../../store/goals-actions";
import { fetchTasksData } from "../../store/tasks-actions";
import AddButton from "./actions/AddButton";
import Layout from "../layout/Layout";
import { goalsActions } from "../../store/goalsSlice";

let initial = true;
const Goals = (props) => {
  const goals = useSelector((state) => state.goals.goalList);

  const [sortedGoals, setSortedGoals] = useState(goals);

  useEffect(() => {
    setSortedGoals(
      goals
        .filter((item) => !item.completed)
        .sort((a, b) => {
          return !a.timeline ? 1 : -1;
        })
        .sort((a, b) => {
          return new Date(a.timeline) > new Date(b.timeline) ? 1 : -1;
        })
    );
  }, [goals]);

  const goalChanged = useSelector((state) => state.goals.changed);

  const addForm = useSelector((state) => state.add);
  const editForm = useSelector((state) => state.edit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoalsData());
    dispatch(fetchTasksData());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (goalChanged) {
      dispatch(fetchGoalsData());
      dispatch(goalsActions.changeStatus());
    }
  }, [dispatch, goalChanged]);

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
        {sortedGoals.map(
          (item) =>
            !item.completed && (
              <div className={classes.goal} key={item.id}>
                <GoalItem
                  key={item.id}
                  item={{
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    timeline: item.timeline,
                    color: item.color,
                    completed: item.completed,
                    user: item.user,
                  }}
                />
              </div>
            )
        )}
        <AddButton
          onClick={() => {
            toggleSaveFormHandler();
            dispatch(addActions.setTitle("New Goal"));
          }}
        />
      </div>

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
