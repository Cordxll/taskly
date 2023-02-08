import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../ui/Card";
import CompletedTasks from "./CompletedTasks";
import classes from "./GoalItem.module.css";
import GoalButton from "./GoalButton";
import Delete from "../pics/delete.svg";
import Edit from "../pics/edit.svg";
const GoalItem = () => {
  const showTasks = useSelector((state) => state.ui.taskIsVisible);
  return (
    <Fragment>
      <Card>
        <div className={classes.goal}>
          <div className={classes.header}>
            <h1>Lose 80lb</h1>
          </div>
          <div className={classes.button}>
            <GoalButton className={classes.btn} />
            <button className={classes.btn}>
              <img src={Edit} alt="edit"></img>
            </button>
            <button className={classes.btn}>
              <img src={Delete} alt="delete"></img>
            </button>
          </div>
        </div>
      </Card>

      {showTasks && (
        <div className={classes.items}>
          <li>
            <CompletedTasks title={"Eat healthy"} date={"01/10/2023"} />
          </li>
        </div>
      )}
    </Fragment>
  );
};

export default GoalItem;
