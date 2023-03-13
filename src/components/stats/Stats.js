import Card from "../ui/Card";
import StatsItem from "./StatsItem";
import { fetchGoalsDataByUserId } from "../../store/goals-actions";
import { fetchTasksDataByUserId } from "../../store/tasks-actions";
import classes from "./Stats.module.css";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Stats = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goalList);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const active = goals
    .filter((item) => !item.completed)
    .sort((item) => (new Date(item.timeline) < new Date() ? -1 : 1));

  const nearlyDone = active.filter((item) => item.progress >= 70);

  const completed = goals.filter((item) => item.completed);

  useEffect(() => {
    if (!user?.username) {
      navigate("/");
    }
    dispatch(fetchGoalsDataByUserId(user.id));
  }, [dispatch, user.id, navigate, user]);

  const overdue = goals.filter(
    (item) => !item.completed && new Date(item.timeline) < new Date()
  );

  const [activeBtn, setActiveBtn] = useState("1");

  const handleClick1 = (event) => {
    setActiveBtn("1");
  };
  const handleClick2 = (event) => {
    setActiveBtn("2");
  };
  const handleClick3 = (event) => {
    setActiveBtn("3");
  };

  return (
    <Fragment>
      {/* <div className={classes.header}>Your Stats</div> */}
      <div className={classes.container}>
        <Card className={classes.topContainer}>
          <div>
            <div className={classes.topCardHeader}>
              <div
                className={classes.cardHeader}
              >{`${goals.length} Goals`}</div>
              <span className={classes.cardSpan}>
                Ambitious person, aren't you?
              </span>
            </div>
            <div className={classes.goals}>
              <button
                className={
                  activeBtn === "1" ? classes.activeBtn : classes.active
                }
                value="1"
                onClick={handleClick1}
              >
                <span>ACTIVE</span>
                <p>{`${active.length}`}</p>
              </button>
              <button
                className={
                  activeBtn === "2"
                    ? `${classes.activeBtn}`
                    : classes.nearlyDone
                }
                value="2"
                onClick={handleClick2}
              >
                <span>NEARLY DONE</span>
                <p>{`${nearlyDone.length}`}</p>
              </button>
              <button
                className={
                  activeBtn === "3" ? classes.activeBtn : classes.completed
                }
                value="3"
                onClick={handleClick3}
              >
                <span>COMPLETED</span>
                <p>{`${completed.length}`}</p>
              </button>
            </div>
          </div>
        </Card>
        {/* {goals.map(
        (item) =>
          !item.completed && (
            <div className={classes.goal} key={item.id}>
              <StatsItem key={item.id} item={item} />
            </div>
          )
      )} */}
        {activeBtn === "1" &&
          active.map((item) => (
            <div
              // className={item in overdue ? classes.overdue : classes.goal}
              key={item.id}
            >
              <StatsItem key={item.id} item={item} />
            </div>
          ))}
        {activeBtn === "2" &&
          nearlyDone.map((item) => (
            <div
              // className={item in overdue ? classes.overdue : classes.goal}
              key={item.id}
            >
              <StatsItem key={item.id} item={item} />
            </div>
          ))}
        {activeBtn === "3" &&
          completed.map((item) => (
            <div
              // className={classes.goal}
              key={item.id}
            >
              <StatsItem key={item.id} item={item} />
            </div>
          ))}
      </div>
    </Fragment>
  );
};
export default Stats;
