import classes from "./Goals.module.css";
import GoalItem from "./GoalItem";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddGoalForm from "./actions/AddGoalForm";
import EditGoalForm from "./actions/EditGoalForm";
import { addActions } from "../../store/addSlice";
import { editActions } from "../../store/editSlice";
import { fetchGoalsData } from "../../store/goals-actions";

const Goals = (props) => {
  const goals = useSelector((state) => state.goals.goalList);
  const goalChanged = useSelector((state) => state.goals.changed);

  const addForm = useSelector((state) => state.add);
  const editForm = useSelector((state) => state.edit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoalsData());
  }, [dispatch]);

  useEffect(() => {
    if (goalChanged) {
      dispatch(fetchGoalsData());
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
      <div className={classes.main}>
        {goals.map(
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
