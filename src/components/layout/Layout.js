import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainHeader from "./MainHeader";
import Goals from "../goals/Goals";
import Tasks from "../tasks/Tasks";
import classes from "./Layout.module.css";
import Navigation from "./Navigation";
import EditCard from "../ui/EditCard";
import SaveCard from "../ui/SaveCard";
import BasicForm from "../ui/BasicForm";
import { fetchGoalsData } from "../../store/goals-actions";

const Layout = (props) => {
  const showAddForm = useSelector((state) => state.add.addFormIsVisible);
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals);
  useEffect(() => {
    dispatch(fetchGoalsData());
  }, [dispatch]);

  const [showForm, setShowForm] = useState(false);

  const showFormHandler = () => {
    setShowForm(true);
  };
  const hideFormHandler = () => {
    setShowForm(false);
  };

  const [showSaveForm, setShowSaveForm] = useState(false);

  const showSaveFormHandler = () => {
    setShowSaveForm(true);
  };
  const hideSaveFormHandler = () => {
    setShowSaveForm(false);
  };

  return (
    <Fragment>
      <body>
        <div className="overlay">
          <header className={classes.header}>
            <h1>My Goals</h1>
          </header>

          <div>
            {/* <div className={classes.button}> */}
            <div className={classes.buttons}>
              <button>Goals</button>
              <button>Tasks</button>
            </div>
            <div className={classes.content}>
              <Goals onShowForm={showFormHandler} />
            </div>
            {!showAddForm && (
              <Navigation onShowSaveForm={showSaveFormHandler} />
            )}
          </div>

          {showForm && (
            <div className={classes.modal}>
              <BasicForm title={"Update goal"} onClose={hideFormHandler} />
            </div>
          )}
          {showSaveForm && (
            <div className={classes.modal}>
              <BasicForm title={"Add a goal"} onClose={hideSaveFormHandler} />
            </div>
          )}
        </div>
      </body>
    </Fragment>
  );
};

export default Layout;
