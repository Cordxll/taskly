import { Fragment } from "react";
import BasicForm from "./BasicForm";
import classes from "./EditCard.module.css";

const EditCard = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <header>Edit</header>
        <BasicForm />
      </div>
    </Fragment>
  );
};

export default EditCard;
