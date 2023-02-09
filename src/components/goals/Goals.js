import classes from "./Goals.module.css";
import Card from "../ui/Card";
import GoalItem from "./GoalItem";
import { Fragment } from "react";

const Goals = (props) => {
  return (
    <Fragment>
      {/* <header className={classes.header}>
        <h1>My Goals</h1>
      </header> */}

      <div className={classes.goal}>
        <GoalItem />
      </div>
    </Fragment>
  );
};
export default Goals;
