import classes from "./EditCard.module.css";
import Delete from "../../pics/delete.svg";
import { goalsActions } from "../../../store/goalsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditCard = (props) => {
  const valid = props.valid;
  const formChanged = props.formChanged;
  return (
    <>
      <div className={classes.submit}>
        {valid && formChanged && (
          <button className={classes.submitButton} onClick={props.onClick}>
            Update
          </button>
        )}
        {(!valid || !formChanged) && (
          <button
            className={classes.submitButton}
            onClick={props.onClick}
            disabled={!valid || !formChanged}
            style={{ opacity: 0.5 }}
          >
            Update
          </button>
        )}
        <button
          type="button"
          className={classes.deleteButton}
          onClick={props.onDeleteClick}
        >
          <img src={Delete} alt="delete btn" />
        </button>
      </div>
    </>
  );
};

export default EditCard;
