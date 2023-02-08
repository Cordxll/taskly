import { Fragment } from "react";
import MainHeader from "./MainHeader";
import Goals from "../goals/Goals";
import Tasks from "../tasks/Tasks";
import classes from "./Layout.module.css";
import Navigation from "./Navigation";

const Layout = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>My Goals</h1>
      </header>
      {/* <MainHeader />
      <main>{props.children}</main> */}
      <div classname={classes.body}>
        <div className={classes.button}>
          <button>Goals</button>
          <button>Tasks</button>
        </div>
        <div className={classes.content}>
          <Goals />
          <Tasks />
        </div>
        <Navigation />
      </div>
    </Fragment>
  );
};

export default Layout;
