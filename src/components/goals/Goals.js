import classes from "./Goals.module.css";
import GoalItem from "./GoalItem";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddGoalForm from "./actions/AddGoalForm";
import EditGoalForm from "./actions/EditGoalForm";
import { addActions } from "../../store/addSlice";
import { editActions } from "../../store/editSlice";

const Goals = (props) => {
  const goals = useSelector((state) => state.goals.goals);

  const addForm = useSelector((state) => state.add);
  const editForm = useSelector((state) => state.edit);
  const dispatch = useDispatch();
  const toggleSaveFormHandler = () => {
    dispatch(addActions.toggle());
  };

  const toggleEditFormHandler = () => {
    dispatch(editActions.toggle());
  };

  return (
    <Fragment>
      <div className={classes.main}>
        {goals.map((item) => (
          <div className={classes.goal}>
            <GoalItem
              // className={classes.goal}
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                description: item.description,
                timeline: item.timeline,
                color: item.color,
                completed: item.completed,
              }}
            />
          </div>
        ))}
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
