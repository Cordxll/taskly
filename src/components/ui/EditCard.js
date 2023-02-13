import BasicForm from "./BasicForm";
import classes from "./EditCard.module.css";
import Modal from "./Modal";
import Delete from "../pics/delete.svg";

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
