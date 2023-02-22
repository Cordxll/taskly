import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import Card from "../ui/Card";
import CompletedTasks from "./CompletedTasks";
import classes from "./GoalItem.module.css";
import MoreButton from "./MoreButton";
import TimeClock from "../pics/time.svg";
import { editActions } from "../../store/editSlice";
import EditGoalForm from "./actions/EditGoalForm";
import { useNavigate } from "react-router-dom";
import { addActions } from "../../store/addSlice";
import ReactDOMServer from "react-dom/server";
import { format } from "date-fns";

const GoalItem = (props) => {
  const dispatch = useDispatch();

  const editForm = useSelector((state) => state.edit);

  const goals = useSelector((store) => store.goals.goalList);

  const existingItem = goals.filter(
    (item) => item.id === Number(props.item.id)
  );
  const { id, title, description, timeline, color, completed } =
    existingItem[0];

  const navigate = useNavigate();

  const toggleEditFormHandler = () => {
    dispatch(editActions.toggle());
  };

  const showTasks = useSelector((state) => state.ui.taskIsVisible);

  const toggleGoalHandler = () => {
    dispatch(uiActions.toggle());
  };

  // const buttonBorder = ReactDOMServer.renderToString(color.backgroundColor);
  const buttonStyle = {
    border: `0.1em solid ${color} `,
  };

  return (
    <>
      <Card>
        <div className={classes.goal}>
          <button
            className={classes.themeColorBtn}
            style={{ backgroundColor: color }}
          ></button>
          <span className={classes.headerText}>{title}</span>
          <MoreButton
            className={classes.moreBtn}
            onClick={() => navigate(`/Layout/EditModal/${id}`)}
            title="Update goal"
            goal={props}
            key={id}
          />
          {description.trim() !== "" && (
            <div className={classes.description}>
              <span style={{ fontWeight: "bold" }}>Note: </span>
              <span>{description}</span>
            </div>
          )}
          {completed ? (
            <div className={classes.date}>
              <img
                className={classes.timeClock}
                src={TimeClock}
                alt="time clock"
              />
              <span
                className={classes.goalTime}
                style={{ fontWeight: "bold", color: color }}
              >
                Completed
              </span>
            </div>
          ) : (
            format(new Date(timeline), "yyyy-MM-dd").trim() !== "" && (
              <div className={classes.date}>
                <img
                  className={classes.timeClock}
                  src={TimeClock}
                  alt="time clock"
                />
                <span className={classes.goalTime}>{timeline}</span>
              </div>
            )
          )}
          <button
            className={classes.itemButton}
            onClick={toggleGoalHandler}
            style={buttonStyle}
          >
            View Tasks
          </button>
        </div>
      </Card>

      {showTasks && (
        <div>
          <CompletedTasks
            className={classes.items}
            title={"Eat healthy"}
            date={"01/10/2023"}
          />
        </div>
      )}

      {editForm.editFormIsVisible && (
        <div className={classes.modal}>
          <EditGoalForm
            onClose={toggleEditFormHandler}
            title={editForm.title}
            goal={props.item}
            key={id}
          />
        </div>
      )}
    </>
  );
};

export default GoalItem;
