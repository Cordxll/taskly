import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import classes from "./Login.module.css"

function Login() {

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState([]);

    const auth = useContext(AuthContext);

    async function handleSubmit(event) {
        event.preventDefault();

        const request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                password: password
            })
        }

        const response = await fetch("http://localhost:8080/user/login/authenticate", request);

        if(response.ok) {
            const { token } = await response.json();
            auth.login(token);
        } else {
            console.log(response);
        }

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
        <>
            <div className={classes.box}>
            <header className={classes.login}>
                <h1>Login</h1>
            </header>
                <form onSubmit={handleSubmit}>
                    <div className={classes.form}>
                        <div className={classes.username}>
                            <label>Username</label>
                            <input type="text" name="username" onChange={handleChange}></input>
                        </div>
                        <div className={classes.password}>
                            <label>Password</label>
                            <input type="password" name="password" onChange={handleChange}></input>
                        </div>
                        <div className={classes.loginBtn}>
                        <button type="submit">Login</button>
                        <p>Forgot your password? <a href="">Click Here</a></p>
                        </div>
                    </div>
                </form>

            </div>
        </>
    );
}

export default Login;