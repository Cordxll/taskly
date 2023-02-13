import BasicForm from "./BasicForm";
import classes from "./SaveCard.module.css";
import Modal from "./Modal";

const SaveCard = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();

    if (!props.formIsValid) {
      return;
    }

    console.log("Submitted!");

    props.resetTitle();
    props.resetDescription();
  };
  return (
    <>
      <div className={classes.submit}>
        <button className={classes.submitButton} onClick={props.onClick}>
          Create new goal
        </button>
      </div>
    </>
  );
};

export default SaveCard;
