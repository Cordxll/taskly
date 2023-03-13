import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Registration.module.css";
import { MdOutlineError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/user-actions.js";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import DefaultPic from "../../assets/blank-profile-picture-973460__340.png";

function Register() {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    pictureUrl: DefaultPic,
  });
  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordMatch, setPasswordMatch] = useState("");
  const [isMatching, setIsMatching] = useState(true);

  const errorList = useSelector((state) => state.auth.errorList);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.username) {
      navigate("/Goals");
    }
    console.log(newUser.fullName);
    if (errorList.length > 0) {
      for (let i = 0; i < errorList.length; i++) {
        let errorMsg = errorList[i];

        if (errorMsg.includes("real")) {
          setFullNameError(errorMsg);
        } else if (
          errorMsg.includes("username") ||
          errorMsg.includes("Username")
        ) {
          setUsernameError(errorMsg);
        } else if (errorMsg.includes("email")) {
          setEmailError(errorMsg);
        } else if (errorMsg.includes("Password")) {
          setPasswordError(errorMsg);
        } else if (newUser.username?.trim() === "") {
          setUsernameError("Username is required");
        }
      }
      dispatch(userActions.clearError());
    }
  }, [navigate, user, errorList, newUser.username, dispatch, newUser]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(errorList);

    console.log(errorList);
    if (newUser?.password !== passwordMatch || passwordMatch === "") {
      setIsMatching(false);
    } else {
      setIsMatching(true);
    }
    dispatch(
      register(
        newUser.fullName,
        newUser.username,
        newUser.password,
        newUser.email
      )
    );

    dispatch(userActions.clearError());
    setFullNameError("");
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
  }

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <div className={classes.form}>
            <div className={fullNameError.length > 0 ? classes.error : ""}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                onChange={(e) =>
                  setNewUser({ ...newUser, fullName: e.target.value.trim() })
                }
              ></input>
              {fullNameError && (
                <p>
                  <MdOutlineError />
                  {fullNameError}
                </p>
              )}
            </div>
            <div className={usernameError.length > 0 ? classes.error : ""}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value.trim() })
                }
              ></input>
              {usernameError && (
                <p>
                  <MdOutlineError />
                  {usernameError}
                </p>
              )}
            </div>
            <div className={passwordError.length > 0 ? classes.error : ""}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value.trim() })
                }
              ></input>
              {passwordError && (
                <p>
                  <MdOutlineError />
                  {passwordError}
                </p>
              )}
            </div>
            <div className={!isMatching ? classes.error : ""}>
              <label htmlFor="passwordMatch">Confirm Password</label>
              <input
                type="password"
                id="passwordMatch"
                name="passwordMatch"
                onChange={(e) => setPasswordMatch(e.target.value)}
              ></input>
              {!isMatching && (
                <p>
                  <MdOutlineError /> Passwords do not match
                </p>
              )}
            </div>
            <div className={emailError.length > 0 ? classes.error : ""}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value.trim() })
                }
              ></input>
              {emailError && (
                <p>
                  <MdOutlineError />
                  {emailError}
                </p>
              )}
            </div>
            <div className={isMatching ? classes.error : ""}>
              <button type="submit">Sign Up</button>
            </div>
            <p>
              Have an account already? <Link to="/login">Click Here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
