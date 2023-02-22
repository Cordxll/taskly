import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Goals from "../goals/Goals";
import classes from "./Layout.module.css";
import Navigation from "./Navigation";
import DesktopNav from "./DesktopNav";
import { fetchGoalsData, sendGoalsData } from "../../store/goals-actions";
import { useState } from "react";

let isInitial = true;

const Layout = (props) => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(fetchGoalsData());
  }, [dispatch]);

  const [goalsBtn, setGoalsBtn] = useState(true);
  const [tasksBtn, setTasksBtn] = useState(false);

  return (
    <Fragment>
      <div>
        <header className={classes.header}>
          <span>My Goals</span>
        </header>

        <div>
          <div className={classes.buttons}>
            <button onClick={(e) => setGoalsBtn(!goalsBtn)}>Goals</button>
            <button onClick={(e) => setTasksBtn(!goalsBtn)}>Tasks</button>
          </div>
          <div className={classes.content}>{goals.goalList && <Goals />}</div>
          {/* <div className={classes.navbar}>
              <Navigation />
            </div> */}
        </div>
      </div>
      {/* )} */}
    </Fragment>
  );
};

export default Layout;
