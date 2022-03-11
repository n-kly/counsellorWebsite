// Iterate through bookings and use instances to display booking cards

import {useEffect, useState} from "react";
import BCard from "./BCard";
import '../admin.css'
import axios from 'axios';

const Display = () => {
    const [booking, setBooking] = useState([])

    // eslint-disable-next-line
    useEffect(async () => {
        async function getDisplayData() { // Async to prevent stalling 
            let res = await axios.get('http://localhost:5000/booking/readfordisplay');
            return res;
        }
        
        getDisplayData().then((res)=>setBooking(res.data.slice(0,3))) // Only get the first 3 upcoming bookings
    }, [])

	return (
        <>
        <div className='topbar'><h1>Upcoming Bookings</h1></div>
        <div className='botbar'></div>
        <div className='container va'>
            {booking.map(instance=>{
                return(
                    <BCard instance={instance} setBooking={setBooking}/>  
                )
            })}
        </div>
        </>
	)
}

export default Display