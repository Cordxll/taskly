import { format,  startOfToday, eachDayOfInterval,  endOfMonth, endOfWeek, isToday, isSameMonth, startOfWeek, isEqual, parse, add, parseISO, isSameDay } from 'date-fns';
import { useState } from 'react';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateDate } from '../../store/dateSlice';
import classes from './Calendar.module.css'

export default function Cal({tasks}){
    
    const selected  = parseISO(useSelector((state) => state.selectedDate.value));
    let [currentMonth, setCurrentMonth] = useState(format(startOfToday(),'MMM-yyyy'));
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
    const newDays =  eachDayOfInterval({start:startOfWeek(firstDayCurrentMonth), end:endOfWeek(endOfMonth(firstDayCurrentMonth))});
    const dispatch = useDispatch();

    console.log(selected);
 
    const style = (input) => {
        if(!isSameMonth(input,firstDayCurrentMonth)){
            return classes.isntSameMonth
        }
        else if(isToday(input) && isEqual(selected,input)){
            return classes.isTodaySelected

        }else if(isToday(input) && !isEqual(selected,input)){
            return classes.isTodayUnselected

        }else if(isEqual(selected,input)){
            return classes.isSelected

        }else{
            return classes.isDefault
        }
    };

    function nextMonth(){
        let firstDayNextMonth = add(firstDayCurrentMonth, {months : 1});
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    };
    function prevMonth(){
        let firstDayNextMonth = add(firstDayCurrentMonth, {months : -1});
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    };

    return(
            <div className={classes.container}>
                <div className={classes.containerChild}>
                    <div className={classes.header}>              
                        <button className={classes.allUnset} onClick={() => prevMonth()}>
                            <FaArrowAltCircleLeft className={classes.colorWhite} size={24}/>
                        </button>
                            
                        {format(firstDayCurrentMonth, 'MMM yyyy')}
                        <button className={classes.allUnset} onClick={() => nextMonth()}>
                            <FaArrowAltCircleRight className={classes.colorWhite} size={24}/>
                        </button>
                    </div>

                    <div className={classes.gridHeader}>
                        {["S","M","T","W","Th","F","Sa"].map(x => (<div >{x}</div>))}
                    </div>
                    <div className={classes.gridHeaderSm}>
                        {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(x => (<div >{x}</div>))}
                    </div>
                    <div className={classes.calendarGrid}>
                        {
                        newDays.map(
                            x => (
                            <button className={classes.calendarDate} onClick={()=> {dispatch(updateDate(format(x,'yyyy-MM-dd')))}}>
                            <time dateTime={format(x, 'yyyy-MM-dd')} style={{}}>
                                <div className={style(x)}>
                                    {format(x, 'd')}
                                    {tasks.some(meeting =>isSameDay(parseISO(meeting.startDatetime), x)) && (<div style={{position:"absolute",bottom:"0px",left:"0px",right:"0px",fontSize:"8px"}}>😊</div>)}
                                </div> 
                            </time>
                            </button>
                            ))
                        }
                    </div>
                </div>
            </div>
    )
}