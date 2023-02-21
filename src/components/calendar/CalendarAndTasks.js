import ViewTasks from './ViewTasks'
import classes from './CalendarAndTask.module.css'
import { fetchTask } from '../../hooks/fetchTask';
import Calendar from './Calendar'

export default function CalendarAndTask(){
    const meetings = fetchTask();

    return(
        <div className={classes.container}>
            <div className={classes.calendar}>
                <Calendar tasks={meetings} />
            </div>
            <div className={classes.task}>
                <ViewTasks tasks={meetings} />
            </div>
            
        </div>
    )
}