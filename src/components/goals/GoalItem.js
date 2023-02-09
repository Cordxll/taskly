import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../ui/Card";
import CompletedTasks from "./CompletedTasks";
import classes from "./GoalItem.module.css";
import GoalButton from "./GoalButton";
import MoreButton from "./MoreButton";

const GoalItem = (props) => {
  const showTasks = useSelector((state) => state.ui.taskIsVisible);
  return (
    <Fragment>
      <Card>
        <div className={classes.goal}>
          <span className={classes.headerText}>Lose 80lb</span>

          <MoreButton className={classes.moreBtn} />

          <div className={classes.button}>
            <GoalButton className={classes.btn} />
          </div>
        </div>
      </Card>

      {showTasks && (
        <CompletedTasks
          className={classes.items}
          title={"Eat healthy"}
          date={"01/10/2023"}
        />
      )}
    </Fragment>
  );
};

export default GoalItem;
