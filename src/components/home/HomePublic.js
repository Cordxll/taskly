import { Link } from 'react-router-dom'
import classes from './Home.module.css'
import logo from '../../assets/taskly-homepage-black.png' 
export default  function  HomePublic(){
  return(
    <div className={classes.container} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div style={{alignContent:"center",textAlign:"center",width:'90%'}}>
        <img src={logo} style={{width:"50%",padding:"4%"}}/>
        <p style={{padding:"1%"}} className={classes.p}>We are more than just a planner or social media. Customize this app to help you strive towards your goals.</p>
        <div style={{display:"flex", justifyContent:"center", width:"100%", gap:"24px"}}>
          <Link to="/register" className={`${classes.button} ${classes.btn1}`}>Sign Up</Link>
          <Link to="/Login" className={`${classes.button} ${classes.btn2}`}>Sign In</Link>
        </div>
        
      </div>    
    </div>
  )
};


