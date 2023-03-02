import {  parseISO,format } from 'date-fns';
import classes from "./Tasks.module.css"

export default function Tasks({task}){       
  let day = parseISO(task.day)

  return(
      <div className={classes.container}>
          <div>
              <div style={{display:"flex"}}>
                 {task.goal?.title && <div className={classes.bubble}> {task.goal?.title} </div> }
              </div>
              <div className={classes.header}>{task.title}</div>
              <time className={classes.time} dateTime={day}>{format(day, 'eeee h:mm aa')}</time>
          </div>
            <button className={classes.btn}>
              <img src='https://cdn1.iconfinder.com/data/icons/small-v17/100/menu_options_points_select_selection_three-512.png' width={40}/>
            </button>
      </div>
  )
}