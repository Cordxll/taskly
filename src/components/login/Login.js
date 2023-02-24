import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css"
import {login} from "../../store/user-actions.js"
import { useDispatch, useSelector } from "react-redux";

function Login() {

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user)

    function handleSubmit(event) {
        event.preventDefault();

        dispatch(login(username, password));
        console.log(user);
    }

    function handleChange(event) {
        if(event.target.name == "username") {
            username = event.target.value;
            setUsername(username);
        } else if(event.target.name == "password") {
            password = event.target.value;
            setPassword(password);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <h1 className={classes.login} >Login to your account</h1>
                <form onSubmit={handleSubmit}>
                    <div className={classes.form}>
                        <div>
                            <label>Username</label>
                            <input type="text" name="username" onChange={handleChange}></input>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" name="password" onChange={handleChange}></input>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                            <p>Don't have an account? <Link to="/register" style={{color:"blue"}}>Click Here</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;