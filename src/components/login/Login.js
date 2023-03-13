import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import { login } from "../../store/user-actions";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";

function Login() {
  const navigate = useNavigate();

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [loginError, setLoginError] = useState("");

  const errorList = useSelector((state) => state.auth.errorList);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.username) {
      navigate("/Goals");
    }
    if (errorList.length > 0) {
      setLoginError(errorList[0]);
      dispatch(userActions.clearError());
    }
  }, [navigate, user, errorList, dispatch]);

  function handleSubmit(event) {
    event.preventDefault();

    console.log(errorList);
    console.log(loginError);

    dispatch(login(username, password));
    dispatch(userActions.clearError());

    setLoginError("");
  }

  function handleChange(event) {
    if (event.target.name === "username") {
      setUsername(event.target.value.trim());
    } else if (event.target.name === "password") {
      setPassword(event.target.value.trim());
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <h1 className={classes.login}>Login to your account</h1>
        <form onSubmit={handleSubmit}>
          <div className={classes.form}>
            <div>
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
              ></input>
            </div>
            <div className={loginError ? classes.error : ""}>
              {loginError && (
                <p>
                  <MdOutlineError />
                  {loginError}
                </p>
              )}
              <button type="submit" onClick={handleSubmit}>
                Login
              </button>
            </div>
            <p>
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "blue" }}>
                Click Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
