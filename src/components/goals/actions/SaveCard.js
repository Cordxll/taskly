import classes from "./SaveCard.module.css";

const SaveCard = (props) => {
  const valid = props.valid;
  const title = props.title;
  return (
    <>
      <div className={classes.submit}>
        {valid && (
          <button className={classes.submitButton} onClick={props.onClick}>
            {/* Create new goal */}
            {title}
          </button>
        )}
        {!valid && (
          <button
            className={classes.submitButton}
            onClick={props.onClick}
            disabled={!valid}
            style={{ opacity: 0.5 }}
          >
            {title}
          </button>
        )}
      </div>
    </>
  );
};

export default SaveCard;
