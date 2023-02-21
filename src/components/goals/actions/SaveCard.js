import classes from "./SaveCard.module.css";

const SaveCard = (props) => {
  const valid = props.valid;
  return (
    <>
      <div className={classes.submit}>
        {valid && (
          <button className={classes.submitButton} onClick={props.onClick}>
            Create new goal
          </button>
        )}
        {!valid && (
          <button
            className={classes.submitButton}
            onClick={props.onClick}
            disabled={!valid}
            style={{ opacity: 0.5 }}
          >
            Create new goal
          </button>
        )}
      </div>
    </>
  );
};

export default SaveCard;
