import classes from "./Goals.module.css";
import GoalItem from "./GoalItem";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddGoalForm from "./actions/AddGoalForm";
import { addActions } from "../../store/addSlice";

const Goals = (props) => {
  const goals = useSelector((state) => state.goals.goals);

  const addForm = useSelector((state) => state.add);
  const dispatch = useDispatch();
  const toggleSaveFormHandler = () => {
    dispatch(addActions.toggle());
  };

  return (
    <Fragment>
      <div className={classes.goal}>
        {goals.map((item) => (
          <GoalItem
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              color: item.color,
            }}
          />
        ))}
      </div>
      {addForm.addFormIsVisible && (
        <div className={classes.modal}>
          <AddGoalForm onClose={toggleSaveFormHandler} title={addForm.title} />
        </div>
      )}
    </Fragment>
  );
};
export default Goals;
