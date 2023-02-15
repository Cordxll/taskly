import { format, parseISO, isSameDay } from 'date-fns';
import { useSelector } from 'react-redux';
import Tasks from '../tasks/Tasks';
import classes from './ViewTasks.module.css'

export default function ViewTasks({tasks}){

    const selected  = parseISO(useSelector((state) => state.selectedDate.value));
    
    let selectedDayTasks = tasks?.filter((task) =>
        isSameDay(parseISO(task.startDatetime), selected)
      )

    return(
        <div className={classes.container}>
            <div className={classes.containerChild}>
                <h1>{format(selected, 'MMMM dd yyyy')}</h1>
                <h2 className={classes.whatsHappening}>What's Happening ...</h2>
                {selectedDayTasks?.length > 0 ? (
                selectedDayTasks?.map((task) => (
                <Tasks task={task}/>
            ))
          ) : (
            <h2 className={classes.noTask}>No tasks for today.</h2>
          )}    
            </div>
        </div>
    )
}