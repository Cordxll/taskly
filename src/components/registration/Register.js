import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Registration.module.css";
import { MdOutlineError } from 'react-icons/md';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/user-actions.js";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [passwordMatch, setPasswordMatch] = useState("");
    let [email, setEmail] = useState("");

    let [isMatching, setIsMatching] = useState(true);

    let [usernameError, setUsernameError] = useState("");
    let [emailError, setEmailError] = useState("");
    let [passwordError, setPasswordError] = useState("");

    const errorList = useSelector((state) => state.auth.errorList);
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    function handleSubmit(event) {

        event.preventDefault();

        dispatch(register(username, password, email));

        if (errorList.length > 0) {
            for (let i = 0; i < errorList.length; i++) {
                let errorMsg = errorList[i];

                if (errorMsg.includes("username")) {
                    setUsernameError(errorMsg);
                }
                if (errorMsg.includes("email")) {
                    setEmailError(errorMsg);
                }
                if (errorMsg.includes("Password")) {
                    setPasswordError(errorMsg);
                }
        
            }
        }
        if(password != passwordMatch || passwordMatch == "") {
            setIsMatching(false);
        }
        if(user.token) {
            navigate("/Goals");
        }
    }

    function handleChange(event) {
        if (event.target.name === "username") {
            username = event.target.value;
            setUsername(username);
        } else if (event.target.name === "password") {
            password = event.target.value;
            setPassword(password);
        } else if (event.target.name === "passwordMatch") {
            password = event.target.value;
            setPassword(password);
        } else if (event.target.name === "email") {
            email = event.target.value;
            setEmail(email);
        } else if (event.target.name === "passwordMatch") {
            passwordMatch = event.target.value;
            setPasswordMatch(passwordMatch);
        };
    }


    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <h1>Create an account</h1>
                <form onSubmit={handleSubmit}>
                    <div className={classes.form}>
                        <div className={usernameError.length > 0 ? classes.error : ""}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" onChange={handleChange}></input>
                            {usernameError && <p><MdOutlineError />{usernameError}</p>}
                        </div>
                        <div className={passwordError.length > 0 ? classes.error : ""}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={handleChange}></input>
                            {passwordError && <p><MdOutlineError />{passwordError}</p>}
                        </div>
                        <div className={!isMatching ? classes.error : ""}>
                            <label htmlFor="passwordMatch">Confirm Password</label>
                            <input type="password" id="passwordMatch" name="passwordMatch" onChange={handleChange}></input>
                            {!isMatching && <p><MdOutlineError /> Passwords do not match</p>}
                        </div>
                        <div className={emailError.length > 0 ? classes.error : ""}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email" onChange={handleChange}></input>
                            {emailError && <p><MdOutlineError />{emailError}</p>}
                        </div>
                        <div className={isMatching ? classes.error : ""}>
                            <button type="submit">Sign Up</button>
                        </div>
                        <p>Have an account already? <Link to="/login">Click Here</Link></p>
                    </div>
                </form>
            </div>
        </div>




    );
}

export default Register;