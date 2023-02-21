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