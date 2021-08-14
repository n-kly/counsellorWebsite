import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

const DateCalendar = ({selectedDate,setSelectedDate}) => { 
    return (
        <div>
            <Calendar 
                onChange={setSelectedDate} 
                value={selectedDate} 
                maxDate={new Date(dayjs().add(11,'month').endOf('month').toDate())}
                minDate={new Date()}
                next2Label=""
                prev2Label=""
                minDetail="year"
                tileClassName={
                    ({date,view})=>{
                        if(dayjs(date).format('DD/MM/YYYY')==="19/08/2021"){
                            return 'green'
                        }
                    }
                }
                tileDisabled={
                    ({date,view})=>{
                        if(dayjs(date).format('DD/MM/YYYY')==="19/08/2021"){
                            return 'green'
                        }
                    }
                    
                }
            />
        </div>
    )
}

export default DateCalendar
