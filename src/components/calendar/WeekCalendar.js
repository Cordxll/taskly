import {
  format,
  startOfToday,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
  isEqual,
  parse,
  add,
  parseISO,
} from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import classes from "./WeekCalendar.module.css";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { useState } from "react";
import { updateDate } from "../../store/dateSlice";

export default function DateViewer() {
  const selectedDate = parseISO(
    useSelector((state) => state.selectedDate.value)
  );
  let [currentWeek, setCurrentWeek] = useState(
    format(startOfToday(), "MMM-dd-yyyy")
  );
  let firstDayCurrentWeek = parse(currentWeek, "MMM-dd-yyyy", new Date());
  const newDays = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentWeek),
    end: endOfWeek(firstDayCurrentWeek),
  });
  const dispatch = useDispatch();

  function nextWeek() {
    let firstDayNextWeek = add(firstDayCurrentWeek, { weeks: 1 });
    setCurrentWeek(format(firstDayNextWeek, "MMM-dd-yyyy"));
  }
  function prevWeek() {
    let firstDayNextWeek = add(firstDayCurrentWeek, { weeks: -1 });
    setCurrentWeek(format(firstDayNextWeek, "MMM-dd-yyyy"));
  }

  return (
    <div className={classes.container} key={Math.random()}>
      <button onClick={prevWeek} className={classes.button}>
        <MdOutlineArrowBackIos className={classes.arrow} />
      </button>
      <div className={classes.datesContainer}>
        <div className={classes.dates}>
          {newDays.map((x) => (
            <button
              key={Math.random()}
              className={
                isEqual(selectedDate, x) ? classes.selected : classes.card
              }
              onClick={() => {
                dispatch(updateDate(format(x, "yyyy-MM-dd")));
              }}
            >
              <div
                style={{ fontWeight: "bold", color: "gray" }}
                key={Math.random()}
              >
                {format(x, "eee")}
              </div>
              <div
                style={{ fontWeight: "bold", marginTop: "10px" }}
                key={Math.random()}
              >
                {format(x, "dd")}
              </div>
            </button>
          ))}
        </div>
      </div>
      <button onClick={nextWeek} className={classes.button}>
        <MdOutlineArrowForwardIos className={classes.arrow} />
      </button>
    </div>
  );
}
