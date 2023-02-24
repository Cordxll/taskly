import classes from "./TaskItem.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editActions } from "../../store/editSlice";
import { format } from "date-fns";

const TaskItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((store) => store.tasks.taskList);

  const existingItem = tasks.filter(
    (item) => item.id === Number(props.item.id)
  );

  const { id, title, description, time, completed } = existingItem[0];

  return (
    <div className={classes.taskItem}>
      <div className={classes.container}>
        <div>
          <div style={{ display: "flex" }}>
            {["Lose Weight", "Do More"].map((x) => (
              <>
                <div className={classes.bubble}>{x}</div>
              </>
            ))}
          </div>
          <div className={classes.header}>{title}</div>
          <time className={classes.time}>
            {/* {format(time, "yyyy:MM:dd")} */}
          </time>
        </div>
        <button
          className={classes.btn}
          onClick={() => {
            navigate(`/Tasks/EditModal/${id}`);
            dispatch(editActions.setTitle("Update task"));
          }}
          title="Update task"
          goal={props}
          key={id}
        >
          <img
            src="https://cdn1.iconfinder.com/data/icons/small-v17/100/menu_options_points_select_selection_three-512.png"
            width={30}
            alt="more button"
          />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
