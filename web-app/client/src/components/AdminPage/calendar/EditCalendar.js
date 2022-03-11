import Calendar from 'react-calendar';
import Button from 'react-bootstrap/Button'
import './Calendar.css'
import { useState } from 'react';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios'

const EditCalendar = () => {
    const [dates, setDates] = useState({available:[],booked:[]})
    const [tempDates, setTempDates] = useState({})
    const [changeLog, setChangeLog] = useState({}) 
    
    async function resetCalendar(){
        async function getRegionData() { // Async to prevent stalling 
            let response = await axios.get('http://localhost:5000/booking/readforform');
            return response;
        }
    
        // eslint-disable-next-line
        let calendarData = (await getRegionData()).data;    
        
        let available = [];
	    let booked = [];
    
        calendarData.forEach((instance) => { 
            if (instance.status === 'Available') {
                available.push(dayjs(instance.aptDate).format('DD/MM/YYYY'));
            
            } else if (instance.status === 'Booked') {
                booked.push(dayjs(instance.aptDate).format('DD/MM/YYYY'));
            }
        });

        return {available:available,booked:booked}
    }


    useEffect(async ()=>{
        let res = await resetCalendar()
        setTempDates(res.available);
        setDates(res);
    }, [])

    async function handleSubmit(){
        const token = localStorage.getItem('adminToken')
        let verify;

        if(!!token) {
            verify = await axios.post('http://localhost:5000/login/verify', {adminToken:token});
        } else {
            verify =  false;
        }

        if(verify){
            let submitData = {
                changeLog: changeLog,
                adminToken: token,
            }

            axios.post('http://localhost:5000/booking/editcalendar', submitData)
            setChangeLog({})
        } else {
            alert('Invalid authentication token')
        }
    }

    return (
        <div className='ccontainer'>
            <Calendar
                onChange={(e)=>{
                    let changeDate = dayjs(e).format('DD/MM/YYYY')

                    if(dates.available.includes(changeDate)){ // Remove
                        
                        let Arr = dates.available
                        let newArray = Arr.filter(day=>day!==changeDate)

                        setDates({...dates,available:newArray})

                        if(tempDates.includes(changeDate)){
                            setChangeLog({...changeLog, [e]:false})
                        } else {
                            let newChanges = changeLog
                            delete newChanges[e]
                            setChangeLog(newChanges)
                        }
                            
                    } else { // Add
                        setDates({...dates,available:[...dates.available,changeDate]})
                        
                        if(tempDates.includes(changeDate)){
                            let newChanges = changeLog
                            delete newChanges[e]
                            setChangeLog(newChanges) 
                        } else {
                            setChangeLog({...changeLog, [e]:true})
                        }
                    }
                }}
                
                tileClassName={({ date, view }) => {
                    if (dates.available.includes(dayjs(date).format('DD/MM/YYYY'))) {
                        return 'cavailable';

					} else if (dates.booked.includes(dayjs(date).format('DD/MM/YYYY'))) {
                        return 'cbooked';
                }}}

                tileDisabled={({ date, view }) => {
                    if (date>new Date()) {
                        return false; 
                    } else {
                        return true;
                    }
                }}

                value=''
                showNeighboringMonth='false'
            />
            <Button
            disabled={Object.keys(changeLog).length === 0} 
            onClick={(()=>{handleSubmit()})}>Save changes</Button>
            <Button
            disabled={Object.keys(changeLog).length === 0}  
            onClick={async ()=>{
                let res = await resetCalendar();
                setTempDates(res.available);
                setDates(res);
            }
            
            }>Cancel</Button>
        </div>
    )
}

export default EditCalendar
