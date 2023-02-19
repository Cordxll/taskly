import { Link } from 'react-router-dom'
import classes from './Home.module.css'
export default  function  HomePublic(){
  return(
    <div className={classes.container} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div style={{alignContent:"center",textAlign:"center",width:'90%'}}>
       <img 
        src='https://www.notion.so/cdn-cgi/image/format=auto,width=640,quality=100/front-static/pages/product/home-page-hero-refreshed-v3.png'
        className={classes.img}/>
        <h1 className={classes.h1}>
        One Goal. Conquer All Goals
        </h1>
        <p style={{padding:"1%"}} className={classes.p}>We are more than just a planner or social media. Customize Productive People to help you strive towards your goals.</p>
        <div style={{display:"flex", justifyContent:"center", width:"100%", gap:"24px"}}>
          <button className={classes.button} style={{backgroundColor:"black",color:"white"}}>Sign Up</button>
          <button className={classes.button} style={{backgroundColor:"white"}}>Sign In</button>
        </div>
        <Link to='/Cal'>Calendar</Link>
        <Link to='/Edit'>Edit</Link>
        <Link to='/Layout'>Layout</Link>
      </div>    
    </div>
  )
};


