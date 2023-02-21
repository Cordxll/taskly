import { Link } from 'react-router-dom'
import classes from './Home.module.css'
export default  function  HomePublic(){
  return(
    <div className={classes.container} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div style={{alignContent:"center",textAlign:"center",width:'90%'}}>
        <h1 className={classes.h1}>
        Productivity App
        </h1>
        <p style={{padding:"1%"}} className={classes.p}>We are more than just a planner or social media. Customize Productive People to help you strive towards your goals.</p>
        <div style={{display:"flex", justifyContent:"center", width:"100%", gap:"24px"}}>
          <button className={`${classes.button} ${classes.btn1}`}>Sign Up</button>
          <button className={`${classes.button} ${classes.btn2}`}>Sign In</button>
        </div>
        
      </div>    
    </div>
  )
};


