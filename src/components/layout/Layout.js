import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Goals from "../goals/Goals";
import classes from "./Layout.module.css";
import Navigation from "./Navigation";
import DesktopNav from "./DesktopNav";
import { fetchGoalsData } from "../../store/goals-actions";
import { useState } from "react";

const Layout = (props) => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goals);

  useEffect(() => {
    dispatch(fetchGoalsData());
  }, [dispatch]);

  const [isDesktop, setDesktop] = useState(window.innerWidth > 768);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const [goalsBtn, setGoalsBtn] = useState(true);
  const [tasksBtn, setTasksBtn] = useState(false);

  return (
    <Fragment>
      {isDesktop ? (
        <DesktopNav />
      ) : (
        <div className={classes.navbar}>
          <Navigation />
        </div>
      )}
      <div>
        <header className={classes.header}>
          <span>My Goals</span>
        </header>

        <div>
          <div className={classes.buttons}>
            <button onClick={(e) => setGoalsBtn(!goalsBtn)}>Goals</button>
            <button onClick={(e) => setTasksBtn(!goalsBtn)}>Tasks</button>
          </div>
          <div className={classes.content}>{goals && <Goals />}</div>
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
