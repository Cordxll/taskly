import classes from "./ColorPicker.module.css";

const ColorPicker = (props) => {
  const color1 = "#a6cba8";

  const color2 = "#75c0c6";

  const color3 = "#b4737c";

  const color4 = "#686dad";

  const color5 = "#9868ac";

  const handleBtn1 = () => {
    props.onChange(color1);
  };
  const handleBtn2 = () => {
    props.onChange(color2);
  };
  const handleBtn3 = () => {
    props.onChange(color3);
  };
  const handleBtn4 = () => {
    props.onChange(color4);
  };
  const handleBtn5 = () => {
    props.onChange(color5);
  };
  //custom button color change
  const customColorHandler = (evt) => {
    props.onChange(evt.target.value);
  };

  return (
    <div className={classes.colors}>
      <label className={classes.colorText}>What color?</label>

      <div className={classes.colorBtns}>
        <button
          type="button"
          className={classes.color1}
          onClick={handleBtn1}
        ></button>
        <button
          type="button"
          className={classes.color2}
          onClick={handleBtn2}
        ></button>
        <button
          type="button"
          className={classes.color3}
          onClick={handleBtn3}
        ></button>
        <button
          type="button"
          className={classes.color4}
          onClick={handleBtn4}
        ></button>
        <button
          type="button"
          className={classes.color5}
          onClick={handleBtn5}
        ></button>

        <button type="button" className={classes.Rainbow_Circle}>
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
