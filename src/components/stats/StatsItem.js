import Card from "../ui/Card";
import classes from "./StatsItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const StatsItem = (props) => {
  const goals = useSelector((store) => store.goals.goalList);

  const existingItem = goals.filter(
    (item) => item.id === Number(props.item.id)
  );

  const { id, title, description, timeline, color, completed, progress } =
    existingItem[0];
  return (
    <>
      <Card>
        <div className={classes.goal}>
          <div className={classes.progressHeader}>
            <CircularProgressbar
              className={classes.progressbar}
              value={progress}
              maxValue={100}
              text={`${progress}%`}
              styles={buildStyles({
                textColor: "black",
                pathColor: color,
                trailColor: "#caa2a264",
              })}
            />
            <div className={classes.titleDescription}>
              <span className={classes.progressTitle}>{title}</span>
              <span className={classes.progressDescription}>{description}</span>
            </div>
            {/* </div> */}
            {/* <div className={classes.completedTasks}>
              <div className={classes.completedTasksHeader}>
                <span>Tasks Completed: </span>
                <span>6</span>
              </div>
              {!completed && timeline && (
                //   <div>

                <span className={classes.goalTime}>
                  {format(
                    new Date(timeline).setDate(
                      new Date(timeline).getDate() + 1
                    ),
                    "MMM dd, yyyy"
                  )}
                </span>
                //   </div>
              )}
            </div> */}
          </div>
        </div>
        {/* </div> */}
      </Card>
    </>
  );
};

export default StatsItem;
