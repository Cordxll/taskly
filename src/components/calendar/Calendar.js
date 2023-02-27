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

    const style = (input) => {
        if(!isSameMonth(input,firstDayCurrentMonth)){
            return classes.isntSameMonth
        } else if(isToday(input) && isEqual(selected,input)){
            return classes.isTodaySelected

        }else if(isToday(input) && !isEqual(selected,input)){
            return classes.isTodayUnselected

        }else if(isEqual(selected,input)){
            return classes.isSelected

        }else{
            return classes.isDefault
        }
    }

    function nextMonth(){
        let firstDayNextMonth = add(firstDayCurrentMonth, {months : 1});
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    };
    function prevMonth(){
        let firstDayNextMonth = add(firstDayCurrentMonth, {months : -1});
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    };
    
    function DesktopHeader(){
        return(
            <div className={classes.desktopHeader}>
                {format(firstDayCurrentMonth, 'MMM yyyy')}

                <div className={classes.btns}>
                    <button className={classes.allUnset} onClick={() => prevMonth()}>
                        <FaArrowAltCircleLeft className={classes.colorWhite} size={24}/>
                    </button>  
                    <button className={classes.allUnset} onClick={() => nextMonth()}>
                        <FaArrowAltCircleRight className={classes.colorWhite} size={24}/>
                    </button>
                    <div className={classes.search}></div>
                </div>
            </div>
        )
    };

    function MobileHeader(){
        return(
            <div className={classes.header}>              
                <button className={classes.allUnset} onClick={() => prevMonth()}>
                    <FaArrowAltCircleLeft className={classes.colorWhite} size={24}/>
                </button>   
                {format(firstDayCurrentMonth, 'MMM yyyy')}
                <button className={classes.allUnset} onClick={() => nextMonth()}>
                    <FaArrowAltCircleRight className={classes.colorWhite} size={24}/>
                </button>
            </div>
        )
    }

    return(
            <div className={classes.container}>
                <div className={classes.containerChild}>
                    {DesktopHeader()}
                    <div className={classes.gridHeader}>
                        {["S","M","T","W","Th","F","Sa"].map(x => (<div >{x}</div>))}
                    </div>
                    <div className={classes.gridHeaderSm}>
                        {["Sun","Mon","Tue","Wed","Thur","Fri","Sat"].map(x => (<div>{x}</div>))}
                    </div>
                    <div className={classes.calendarGrid}>
                        {
                        newDays.map(
                            x => (
                            <button className={classes.calendarDate} onClick={()=> {dispatch(updateDate(format(x,'yyyy-MM-dd')))}}>
                                <time dateTime={format(x, 'yyyy-MM-dd')} style={{height:"100%"}}>
                                    <div className={style(x)}>
                                        <p>{format(x,'d')}</p>
                                        {tasks.filter(y => isSameDay(parseISO(y.startDatetime),x)).map(z => 
                                            (
                                            <div className={classes.task}>
                                                <p>{z.name}</p>
                                            </div>)
                                            ) }
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