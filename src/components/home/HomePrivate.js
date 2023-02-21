import { Link } from 'react-router-dom'
import classes from './Home.module.css'
export default function HomePrivate(){
    return(
        <div className={classes.container} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div>
                <div style={{height:"fit"}}>
                    <Link to='/Cal' className={classes.button}>View Your Calendar</Link>
                </div>
                <div style={{height:"20px"}}>
                    <Link to='/Edit' className={classes.button}>Edit</Link>
                </div>
                <div style={{height:"20px"}}>
                    <Link to='/Layout' className={classes.button}>Layout</Link>
                </div>
            
            </div>
        </div>
    )
}