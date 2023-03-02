import ViewTasks from './ViewTasks'
import classes from './CalendarAndTask.module.css'
import Calendar from './Calendar'
import { useSelector } from 'react-redux';

export default function CalendarAndTask(){
    const tasks = useSelector((state) => state.tasks.taskList);

    return(
        <div className={classes.container}>
            <div className={classes.calendar}>
                <Calendar tasks={tasks} />
            </div>
            <div className={classes.task}>
                <ViewTasks tasks={tasks} />
            </div>
            
        </div>
    )
}