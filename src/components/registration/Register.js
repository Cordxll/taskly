import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Registration.module.css";
import { MdOutlineError } from 'react-icons/md';
import { useDispatch } from "react-redux";
import {register} from "../../store/user-actions.js";

function Register() {

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [isMatching, setIsMatching] = useState(true);
    let [email, setEmail] = useState("");

    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();

        dispatch(register(username, password, email));
    }

    function handleChange(event) {
        if(event.target.name ==="username") {
            username = event.target.value;
            setUsername(username);
        } else  if(event.target.name === "password") {
            password = event.target.value;
            setPassword(password);
        } else  if(event.target.name === "passwordMatch") {
            password = event.target.value;
            setPassword(password);
        } else  if(event.target.name === "email") {
            email = event.target.value;
            setEmail(email);
        };
    }
    function confirmPasswordsMatch(event){
        let passwordMatch = event.target.value;
        if(password !== passwordMatch){

        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <h1>Create an account</h1>
                 <form onSubmit={handleSubmit}>
                     <div className={classes.form}>
                         <div>
                             <label htmlFor="username">Username</label>
                             <input type="text" id="username" name="username" onChange={handleChange}></input>
                         </div>
                         <div>
                             <label htmlFor="password">Password</label>
                             <input type="password" id="password" name="password" onChange={handleChange}></input>
                         </div>
                         <div className={!isMatching ? classes.error: ""}>
                             <label htmlFor="passwordMatch">Confirm Password</label>
                             <input type="password" id="passwordMatch" name="passwordMatch" onChange={confirmPasswordsMatch}></input>
                             {!isMatching && <p><MdOutlineError/> Passwords do not match</p>}
                         </div>
                         <div>
                             <label htmlFor="email">Email</label>
                             <input type="text" id="email" name="email" onChange={handleChange}></input>
                         </div>
                         <div>
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