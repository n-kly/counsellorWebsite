import {useEffect, useState} from "react";
import axios from "axios";
import '../admin.css'
import BCard from "./BCard";
import BCardAdd from "./BCardAdd";

const EditBookings = () => {
    const [booking, setBooking] = useState([])

    // eslint-disable-next-line
    useEffect(async () => {
        async function getDisplayData() { // Async to prevent stalling 
            let response = await axios.get('http://localhost:5000/booking/readfordisplay');
            return response;
        }
        
        getDisplayData()
        .then((res)=>{
            setBooking(res.data);
        })  
    }, [])

    return (
        <>
        <div className='container'>
            <div className='row pad'>
                {booking.map(instance=>{
                    return(
                      <BCard instance={instance} setBooking={setBooking}/>  
                    )
                })}
                <BCardAdd setBooking={setBooking}/>
            </div>
        </div>
        </>
    );
};

export default EditBookings;
