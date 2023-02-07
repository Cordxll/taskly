import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../ui/Card";
import CompletedTasks from "./CompletedTasks";
import classes from "./GoalItem.module.css";
import GoalButton from "./GoalButton";
const GoalItem = () => {
  const showTasks = useSelector((state) => state.ui.taskIsVisible);
  return (
    <Fragment>
      <Card>
        <div className={classes.goal}>
          <div className={classes.header}>
            {/* <div className={classes.dropdown}> */}
            <h2>Lose 80lb</h2>
          </div>
          <div className={classes.button}>
            <GoalButton />
            {showTasks && (
              <ul className={classes.dropdown__content}>
                <li>
                  <CompletedTasks title={"Eat healthy"} date={"01/10/2023"} />
                </li>
                <li>
                  <CompletedTasks title={"Go on a run"} date={"01/15/2023"} />
                </li>
              </ul>
            )}
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default GoalItem;
