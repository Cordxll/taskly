import classes from "./AddButton.module.css";
import { useDispatch } from "react-redux";
import { addActions } from "../../../store/addSlice";

const AddButton = (props) => {
  return (
    <div className={classes.content}>
      <button className={classes.addButton} onClick={props.onClick}>
        <div className={classes.circle_plus}>
          <div className={classes.circle}>
            <div className={classes.horizontal}></div>
            <div className={classes.vertical}></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default AddButton;
