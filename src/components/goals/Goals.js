import classes from "./Goals.module.css";
import Card from "../ui/Card";
import GoalItem from "./GoalItem";
import { Fragment } from "react";
import { goalsActions } from "../../store/goalsSlice";
import { useSelector } from "react-redux";

const Goals = (props) => {
  const goals = useSelector((state) => state.goals.goals);

  return (
    <Fragment>
      <div className={classes.goal}>
        {goals.map((item) => (
          <GoalItem
            onClick={props.onShowForm}
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              color: item.color,
            }}
          />
        ))}
      </div>
    </Fragment>
  );
};
export default Goals;
