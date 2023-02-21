import classes from "./BasicForm.module.css";
import Modal from "../../ui/Modal";
import SaveCard from "./SaveCard";
import ColorPicker from "../ColorPicker";
import { goalsActions } from "../../../store/goalsSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const AddGoalForm = (props) => {
  const dispatch = useDispatch();

  const newId = Math.random();

  let formIsValid = false;

  const [item, setItem] = useState({
    id: newId,
    title: "",
    description: "",
    timeline: "",
    color: {},
  });

  if (item.title.trim() === "") {
    formIsValid = false;
  } else {
    formIsValid = true;
  }

  useEffect(() => {
    console.log(item.color);
  }, [item.color]);

  const changeColorHandler = (colors) => {
    console.log(colors);
    setItem({ ...item, color: { backgroundColor: colors } });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      goalsActions.addGoal({
        id: item.id,
        title: item.title,
        description: item.description,
        timeline: item.timeline,
        color: item.color,
      })
    );
    console.log(item);

    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <form onSubmit={submitHandler}>
          <header>{props.title}</header>
          <div className={classes.control_group}>
            <div className={classes.form}>
              <div className={classes.textInput}>
                <label htmlFor="title">Title</label>
                <input
                  className={classes.titleInput}
                  type="text"
                  id="title"
                  onChange={(e) =>
                    setItem({
                      ...item,
                      title: e.target.value,
                    })
                  }
                  required="required"
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  onChange={(e) =>
                    setItem({
                      ...item,
                      description: e.target.value,
                    })
                  }
                />
                <label htmlFor="timeline">Timeline</label>
                <input
                  id="datePicker"
                  type="date"
                  onChange={(e) =>
                    setItem({
                      ...item,
                      timeline: format(new Date(e.target.value), "yyyy-MM-dd"),
                    })
                  }
                />
              </div>
              <ColorPicker goal={item} onChange={changeColorHandler} />
              {/* {titleHasError && (
                <p className="error-text">Please enter a title.</p>
              )} */}
            </div>
          </div>
          <SaveCard onClick={submitHandler} goal={item} valid={formIsValid} />
        </form>
      </div>
    </Modal>
  );
};

export default AddGoalForm;
