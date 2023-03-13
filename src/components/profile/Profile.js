import classes from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RiPencilLine } from "react-icons/ri";
import { MdOutlineError } from "react-icons/md";
import DefaultPic from "../../assets/blank-profile-picture-973460__340.png";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import { updateUserInfo } from "../../store/user-actions";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const errorList = useSelector((state) => state.auth.errorList);
  console.log(user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(
    // file: "",
    user.pictureUrl
  );

  const [theUser, setTheUser] = useState({
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    // pictureUrl: picture,
    pictureUrl: user.pictureUrl,
  });

  // console.log(picture);
  // console.log(user.pictureUrl);

  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
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
        } else if (theUser.username?.trim() === "") {
          setUsernameError("Username is required");
        }
      }
      dispatch(userActions.clearError());
    }
  }, [navigate, user, errorList, theUser.username, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(errorList);
    console.log(theUser);
    dispatch(updateUserInfo({ ...theUser, pictureUrl: picture }));
    dispatch(userActions.clearError());

    setUsernameError("");
    setFullNameError("");
    setEmailError("");
  };

  const handleLogOut = () => {
    navigate("/");
    dispatch(userActions.logoutUser());
  };

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setPicture(
        // file: file,
        reader.result
      );
      // setTheUser({ ...user, picture: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <img className={classes.img} src={picture} alt="profile pic" />
        <div className={classes.buttonWrapper}>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={photoUpload}
            className={classes.inputfile}
          />
          <label htmlFor="file">
            <RiPencilLine />
          </label>
        </div>
      </div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={fullNameError.length > 0 ? classes.error : ""}>
          <label>Name</label>
          <input
            placeholder={user?.fullName}
            onChange={(e) =>
              setTheUser({
                ...theUser,
                fullName:
                  e.target.value.trim() !== ""
                    ? e.target.value
                    : theUser.fullName,
              })
            }
          ></input>
          <p>We’re big on real names around here.</p>
          {fullNameError && (
            <p>
              <MdOutlineError />
              {fullNameError}
            </p>
          )}
        </div>
        <div className={usernameError.length > 0 ? classes.error : ""}>
          <label>Username</label>

          <input
            placeholder={user?.username}
            onChange={(e) =>
              setTheUser({
                ...theUser,
                username:
                  e.target.value.trim() !== ""
                    ? e.target.value
                    : theUser.username,
              })
            }
          ></input>
          {usernameError && (
            <p>
              <MdOutlineError />
              {usernameError}
            </p>
          )}
        </div>

        <div className={emailError.length > 0 ? classes.error : ""}>
          <label>Email Address</label>
          <input
            placeholder={user?.email}
            onChange={(e) =>
              setTheUser({
                ...theUser,
                email:
                  e.target.value.trim() !== "" ? e.target.value : theUser.email,
              })
            }
          ></input>
          {emailError && (
            <p>
              <MdOutlineError />
              {emailError}
            </p>
          )}
        </div>
        <div>
          <label>Bio</label>
          <textarea id="story" name="story"></textarea>
        </div>
        <div className={classes.footerBtns}>
          <button onClick={handleSubmit}>Update Profile</button>
          <button className={classes.link} onClick={handleLogOut}>
            <MdOutlineLogout className={classes.icon} />
            <p>Logout</p>
          </button>
        </div>
      </form>
    </div>
  );
}
