import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoreSvg from "../pics/more.svg";
import classes from "./MoreButton.module.css";
import { editActions } from "../../store/editSlice";
import EditGoalForm from "./actions/EditGoalForm";

const MoreButton = (props) => {
  const dispatch = useDispatch();
  const editForm = useSelector((state) => state.edit);

  const displayEditFormHandler = (event) => {
    <div className={classes.modal}>
      <EditGoalForm
        // onClose={toggleEditFormHandler}
        title={editForm.title}
        goal={props.goal}
        visible={editForm}
      />
    </div>;
  };

  // const toggleEditFormHandler = (event) => {
  //   const item = props.goal;
  //   console.log(item);
  //   dispatch(editActions.toggle());
  //   displayEditFormHandler();
  // };

  return (
    <Fragment>
      <div className={classes.main}>
        <button
          className={classes.icon}
          onClick={props.onClick}

          // item={props.item}
          // title={props.title}
        >
          <img src={MoreSvg} alt="more" />
        </button>
      </div>

      {/* {editForm.editFormIsVisible && (
        <div className={classes.modal}>
          <EditGoalForm
            onClose={toggleEditFormHandler}
            title={editForm.title}
            goal={props.goal}
          />
        </div>
      )} */}
    </Fragment>
  );
};

export default MoreButton;
