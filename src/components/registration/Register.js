import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import classes from "./Registration.module.css"

function Register() {

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");

    const auth = useContext(AuthContext);

    async function handleSubmit(event) {
        event.preventDefault();

        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                email
            })
        }

        const response = await fetch("http://localhost:8080/user/register", request);

        if(response.ok) {
            const { token } = await response.json();
            auth.login(token);
            
        } else {
            const report = await response.json();
            console.log(report);
        }

    }

    function handleChange(event) {
        if(event.target.name == "username") {
            username = event.target.value;
            setUsername(username);
        } else  if(event.target.name == "password") {
            password = event.target.value;
            setPassword(password);
        } else  if(event.target.name == "email") {
            email = event.target.value;
            setEmail(email);
        };
    }


    return (
        <>
        <div className={classes.box}>
        <header>
                <h1>Register</h1>
            </header>
                 <form onSubmit={handleSubmit}>
                     <div className={classes.form}>
                         <div className={classes.username}>
                             <label htmlFor="username">Username</label>
                             <input type="text" id="username" name="username" onChange={handleChange}></input>
                         </div>
                         <div className={classes.password}>
                             <label htmlFor="password">Password</label>
                             <input type="password" id="password" name="password" onChange={handleChange}></input>
                         </div>
                         <div className={classes.email}>
                             <label htmlFor="email">Email</label>
                             <input type="text" id="email" name="email" onChange={handleChange}></input>
                         </div>
                         <div className={classes.register}>
                         <button type="submit">Sign Up</button>
                         </div>
                     </div>
                 </form>
                 <p>Have an account already? <a href="">Click Here</a></p>
            <div></div>
        </div>
        </>
        


    
    );
}

export default Register;