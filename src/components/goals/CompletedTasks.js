import { Fragment } from "react";
import Card from "../ui/Card";
import classes from "./CompletedTasks.module.css";

const CompletedTasks = (props) => {
  return (
    <Fragment>
      <Card>
        <div className={classes.task}>
          <span>{props.title}</span>
          <span>{props.date}</span>
        </div>
      </Card>
    </Fragment>
  );
};
export default CompletedTasks;
