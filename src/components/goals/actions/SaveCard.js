import classes from "./SaveCard.module.css";

const SaveCard = (props) => {
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
