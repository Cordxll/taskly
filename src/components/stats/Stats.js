import Card from "../ui/Card";
import StatsItem from "./StatsItem";
import { fetchGoalsData } from "../../store/goals-actions";
import classes from "./Stats.module.css";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const Stats = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goalList);
  useEffect(() => {
    dispatch(fetchGoalsData());
  }, [dispatch]);

  const [sortedGoals, setSortedGoals] = useState(goals);
  return (
    <>
      <div className={classes.header}>Your Stats</div>
      <Card>
        <div className={classes.topCardHeader}>
          <div className={classes.cardHeader}>26 Goals</div>
          <span className={classes.cardSpan}>
            Ambitious person, aren't you?
          </span>
        </div>
        <div className={classes.goals}>
          <div className={classes.active}>
            <span>ACTIVE</span>
            <p>7</p>
          </div>
          <div className={classes.nearlyDone}>
            {" "}
            <span>NEARLY DONE</span>
            <p>3</p>
          </div>
          <div className={classes.completed}>
            {" "}
            <span>COMPLETED</span>
            <p>16</p>
          </div>
        </div>
      </Card>{" "}
      {goals.map(
        (item) =>
          !item.completed && (
            <div className={classes.goal} key={item.id}>
              <StatsItem key={item.id} item={item} />
            </div>
          )
      )}
    </>
  );
};
export default Stats;
