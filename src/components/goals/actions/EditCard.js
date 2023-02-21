import classes from "./EditCard.module.css";
import Delete from "../../pics/delete.svg";

const EditCard = (props) => {
  return (
    <>
      <div className={classes.submit}>
        <button className={classes.submitButton} onClick={props.onClick}>
          Update
        </button>
        <button className={classes.deleteButton}>
          <img src={Delete} alt="delete btn" />
        </button>
      </div>
    </>
  );
};

export default EditCard;
