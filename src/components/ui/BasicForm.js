import useInput from "./UseInput";
import classes from "./BasicForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const BasicForm = (props) => {
  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty);

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptioneHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (titleIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(title);

    resetTitle();
    resetDescription();
  };

  // const titleClasses = titleHasError
  //   ? "form-control invalid"
  //   : `form-control ${title}`;

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control_group}>
        <div className={classes.form}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
          />
          {titleHasError && <p className="error-text">Please enter a title.</p>}
        </div>
      </div>

      <div className={classes.submitButton}>
        <button disabled={!formIsValid}>Create new goal</button>
      </div>
    </form>
  );
};

export default BasicForm;
