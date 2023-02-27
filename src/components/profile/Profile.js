import classes from './Profile.module.css'
import { useDispatch, useSelector } from "react-redux";
import ColorPicker from '../goals/ColorPicker';
import {RiPencilLine} from 'react-icons/ri'
import DefaultPic from "../../assets/blank-profile-picture-973460__340.png"

export default function Profile(){
    const user = useSelector((state) => state.auth.user)
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
                        <input placeholder={user?.username}></input>
                    </div>              
                    <div>
                        <label>Name</label>
                        <input placeholder={user?.name}></input>
                        <p>We’re big on real names around here.</p>
                    </div>    
                    <div>
                        <label>Email Address</label>
                        <input placeholder={user?.email}></input>
                    </div>
                    <div>
                        <label>Bio</label>
                        <textarea id="story" name="story"></textarea>
                    </div>              
                    <button>Update Profile</button>
                </form>
        </div>
    )
}