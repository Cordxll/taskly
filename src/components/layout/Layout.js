import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Goals from "../goals/Goals";
import classes from "./Layout.module.css";
import Navigation from "./Navigation";

const Layout = (props) => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goals);

  return (
    <Fragment>
      <div>
        <header className={classes.header}>
          <h1>My Goals</h1>
        </header>

        <div>
          <div className={classes.buttons}>
            <button>Goals</button>
            <button>Tasks</button>
          </div>
          <div className={classes.content}>
            <Goals />
          </div>

          <Navigation />
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
