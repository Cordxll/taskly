import { Fragment } from "react";
import classes from "./Layout.module.css";
import { useNavigate } from "react-router";

const Layout = (props) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div>
        <header className={classes.header}>
          <span>My Goals</span>
        </header>

        <div>
          <div className={classes.buttons}>
            <button onClick={() => navigate("/Goals")}>Goals</button>
            <button onClick={() => navigate("/Tasks")}>Tasks</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
