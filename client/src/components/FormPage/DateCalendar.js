import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

const DateCalendar = ({available,booked,regionBooked,success,selectedDate,setSelectedDate}) => { 

    return (
        <div className="calendarAlign disableCalendar">
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
                        
                    }
                }
                tileDisabled={
                    ({date,view})=>{
                        if(success && (dayjs(date).format('DD/MM/YYYY')!==dayjs(selectedDate).format('DD/MM/YYYY'))){
                            return true;
                            
                        } else {
                            if(available.includes(dayjs(date).format('DD/MM/YYYY'))){
                                return false;
                                
                            } else {
                                return true;
                            }
                        }
                    }  
                }
            />
        </div>
    )
}

export default DateCalendar
