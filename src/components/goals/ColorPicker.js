import classes from "./ColorPicker.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { goalsActions } from "../../store/goalsSlice";

const newId = Math.random();

const ColorPicker = (props) => {
  const dispatch = useDispatch();
  const [colorBtn, setColorBtn] = useState(classes.color1);

  const colorSelected = (element) => {
    // document.body.style.background = element.value;
  };

  //   const { title, color } = props.item;

  const color1 = "#a6cba8";

  const color2 = "#75c0c6";

  const color3 = "#b4737c";

  const color4 = "#686dad";

  const color5 = "#9868ac";

  const changeColorHandler = (evt) => {
    // if (props.goal === null) {
    //   dispatch(
    //     goalsActions.addGoal({
    //       id: newId,
    //       title: props.title,
    //       color: { backgroundColor: colorBtn },
    //     })
    //   );
    // } else {
    dispatch(
      goalsActions.changeColor({
        id: props.goal.id,
        title: props.goal.title,
        color: { backgroundColor: colorBtn },
      })
    );
    // }

    console.log(props.goal);
  };

  const handleBtn1 = () => {
    setColorBtn(color1);
    changeColorHandler();
  };
  const handleBtn2 = () => {
    setColorBtn(color2);
    changeColorHandler();
  };
  const handleBtn3 = () => {
    setColorBtn(color3);
    changeColorHandler();
  };
  const handleBtn4 = () => {
    setColorBtn(color4);
    changeColorHandler();
  };
  const handleBtn5 = () => {
    setColorBtn(color5);
    changeColorHandler();
  };
  const handleBtn6 = () => {
    // setColorBtn(color);
    // changeColorHandler();
  };

  return (
    <div className={classes.colors}>
      <label className={classes.colorText}>What color?</label>

      <div className={classes.colorBtns}>
        <button className={classes.color1} onClick={handleBtn1}></button>
        <button className={classes.color2} onClick={handleBtn2}></button>
        <button className={classes.color3} onClick={handleBtn3}></button>
        <button className={classes.color4} onClick={handleBtn4}></button>
        <button className={classes.color5} onClick={handleBtn5}></button>

        <button className={classes.Rainbow_Circle} onClick={handleBtn6}>
          <input
            className={classes.colorPicker}
            type="color"
            id="color"
            onChange={colorSelected}
          />
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
