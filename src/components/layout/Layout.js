import { Fragment } from "react";
import { useSelector } from "react-redux";
import MainHeader from "./MainHeader";
import Goals from "../goals/Goals";
import Tasks from "../tasks/Tasks";
import classes from "./Layout.module.css";
import Navigation from "./Navigation";
import EditCard from "../ui/EditCard";

const Layout = (props) => {
  const showAddForm = useSelector((state) => state.add.addFormIsVisible);
  return (
    <Fragment>
      <body>
        <div class="overlay">
          <header className={classes.header}>
            <h1>My Goals</h1>
          </header>

          <div classname={classes.body}>
            <div className={classes.button}>
              <button>Goals</button>
              <button>Tasks</button>
            </div>
            <div className={classes.content}>
              <Goals />
            </div>
            {!showAddForm && <Navigation />}
          </div>
          {showAddForm && (
            <div className={classes.modal}>
              <EditCard />
            </div>
          )}
        </div>
      </body>
    </Fragment>
  );
};

export default Layout;
