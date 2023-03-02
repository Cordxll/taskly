import classes from './Profile.module.css'
import { useDispatch, useSelector } from "react-redux";
import ColorPicker from '../goals/ColorPicker';
import {RiPencilLine} from 'react-icons/ri'
import DefaultPic from "../../assets/blank-profile-picture-973460__340.png"
import { useState } from "react";
import { updateUser } from '../../store/user-actions';

export default function Profile(){

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch()

    //add name, bio to backend?
    let [username, setUsername] = useState();
    let [name, setName] = useState();
    let [email, setEmail] = useState();
    let [bio, setBio] = useState();


    function handleSubmit(event) {
        event.preventDefault();

        dispatch(updateUser(username, email, user.userId))

    }

    function handleChange(event) {

        if(event.target.name == "username") {
            let username = event.target.value;
            setUsername(username);
        } else if(event.target.name == "email") {
            let email = event.target.value;
            setEmail(email);
        } else if(event.target.name == "name") {
            let name = event.target.value;
            setName(name);
        } else if(event.target.name == "story") {
            let bio = event.target.value;
            setBio(bio);
        }

    }

    console.log(user.username)
    return(
        <div className={classes.container}>
                <div className={classes.imgContainer}>
                    <img  className={classes.img} src={DefaultPic}/>
                    <div className={classes.buttonWrapper}>
                        <button>
                            <RiPencilLine/>
                        </button>
                    </div>                   
                </div>           
                <form className={classes.form}>
                    <div>
                        <label>Username</label>
                        <input placeholder={user?.username} type="text" name="username" onChange={handleChange}></input>
                    </div>              
                    <div>
                        <label>Name</label>
                        <input placeholder={user?.name} type="text" name="name" onChange={handleChange}></input>
                        <p>We’re big on real names around here.</p>
                    </div>    
                    <div>
                        <label>Email Address</label>
                        <input placeholder={user?.email} type="text" name="email" onChange={handleChange}></input>
                    </div>
                    <div>
                        <label>Bio</label>
                        <textarea id="story" name="story" onChange={handleChange}></textarea>
                    </div>              
                    <button onSubmit={handleSubmit}>Update Profile</button>
                </form>
        </div>
    )
}