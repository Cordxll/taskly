import classes from "./ColorPicker.module.css";
import { useState } from "react";

const ColorPicker = (props) => {
  const [active, setActive] = useState(props.goal.color);

  const color1 = "#a6cba8";

  const color2 = "#75c0c6";

  const color3 = "#b4737c";

  const color4 = "#686dad";

  const color5 = "#9868ac";

  const handleBtn1 = () => {
    setActive(color1);
    props.onChange(color1);
  };
  const handleBtn2 = () => {
    setActive(color2);
    props.onChange(color2);
  };
  const handleBtn3 = () => {
    setActive(color3);
    props.onChange(color3);
  };
  const handleBtn4 = () => {
    setActive(color4);
    props.onChange(color4);
  };
  const handleBtn5 = () => {
    setActive(color5);
    props.onChange(color5);
  };
  //custom button color change
  const customColorHandler = (evt) => {
    setActive(evt.target.value);
    props.onChange(evt.target.value);
  };

  return (
    <div className={classes.colors}>
      <label className={classes.colorText}>What color?</label>

      <div className={classes.colorBtns}>
        <button
          type="button"
          className={
            active === color1
              ? `${classes.color1} + ${classes.active}`
              : `${classes.color1}`
          }
          onClick={handleBtn1}
        ></button>
        <button
          type="button"
          className={
            active === color2
              ? `${classes.color2} + ${classes.active}`
              : `${classes.color2}`
          }
          onClick={handleBtn2}
        ></button>
        <button
          type="button"
          className={
            active === color3
              ? `${classes.color3} + ${classes.active}`
              : `${classes.color3}`
          }
          onClick={handleBtn3}
        ></button>
        <button
          type="button"
          className={
            active === color4
              ? `${classes.color4} + ${classes.active}`
              : `${classes.color4}`
          }
          onClick={handleBtn4}
        ></button>
        <button
          type="button"
          className={
            active === color5
              ? `${classes.color5} + ${classes.active}`
              : `${classes.color5}`
          }
          onClick={handleBtn5}
        ></button>

        <button
          type="button"
          className={
            [color1, color2, color3, color4, color5].find(
              (item) => item === active
            )
              ? `${classes.Rainbow_Circle}`
              : `${classes.Rainbow_Circle} + ${classes.active}`
          }
        >
          <input
            className={classes.colorPicker}
            type="color"
            id="color"
            onChange={customColorHandler}
          />
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
