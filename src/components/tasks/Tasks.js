import {  parseISO,format } from 'date-fns';
import classes from "./Tasks.module.css"

export default function Tasks({task}){       
  
  let startDateTime = parseISO(task.startDatetime)
  let endDateTime = parseISO(task.endDatetime)
  
  return(
      <div className={classes.container}>
          <div>
              <div style={{display:"flex"}}>
                  {["Lose Weight" ,"Do More"].map(x => (
                      <>
                      <div className={classes.bubble}>
                          {x}
                      </div>
                      </>
                  ))}
              </div>
              <div className={classes.header}>{task.name}</div>
              <time className={classes.time} dateTime={task.endDatetime}>{format(endDateTime, 'eeee h:mm aa')}</time>
          </div>
            <button className={classes.btn}>
              <img src='https://cdn1.iconfinder.com/data/icons/small-v17/100/menu_options_points_select_selection_three-512.png' width={40}/>
            </button>
      </div>
  )
}