import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTask } from "../../store/tasks-actions";
import { tasksActions } from "../../store/tasksSlice";
import TaskItem from "./TaskItem";

const TasksPage = (props) => {
  const tasks = useSelector((state) => state.tasks.taskList);
  const taskChanged = useSelector((state) => state.tasks.changed);
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      createTask({
        title: "it's a title",
        description: "some description",
        time: new Date(2023, 12, 12),
      })
    );

    dispatch(
      tasksActions.addTask({
        id: 1,
        title: "it's a title",
        description: "some description",
        time: new Date(2023, 12, 12),
      })
    );
    // dispatch(fetchGoalsData());
  };

  return (
    <Fragment>
      <div>
        <form onSubmit={submitHandler}>
          {tasks.map((item) => (
            <div key={item.id}>
              <TaskItem item={item.title} />
            </div>
          ))}
          <button onClick={submitHandler}></button>
        </form>
      </div>
    </Fragment>
  );
};

export default TasksPage;
