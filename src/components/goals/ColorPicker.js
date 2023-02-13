import classes from "./ColorPicker.module.css";
import { useState } from "react";

const ColorPicker = () => {
  const [color, setColor] = useState(classes.color1);

  function myFunction() {
    switch (color) {
      case 1:
        document.body.style.backgroundColor = "green";
        break;
      case 2:
        document.body.style.backgroundColor = "blue";
        break;
      case 3:
        document.body.style.backgroundColor = "red";
        break;

      default:
    }
  }
  const colorSelected = (element) => {
    // document.body.style.background = element.value;
  };

  const handleBtn1 = () => {
    setColor(classes.color1);
  };
  const handleBtn2 = () => {
    setColor(classes.color2);
  };
  const handleBtn3 = () => {
    setColor(classes.color3);
  };
  const handleBtn4 = () => {
    setColor(classes.color4);
  };
  const handleBtn5 = () => {
    setColor(classes.color5);
  };
  const handleBtn6 = () => {
    setColor(classes.color6);
  };

  return (
    <div className={classes.colors}>
      <label className={classes.colorText}>What color?</label>

      <div className={classes.colorBtns} color={color}>
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
