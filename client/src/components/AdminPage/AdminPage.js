import {useEffect, useState} from "react";
import axios from "axios";
import './admin.css'
import BCard from "./BCard";

const AdminPage = () => {
    const [booking, setBooking] = useState([])

    useEffect(async () => {
        async function getDisplayData() { // Async to prevent stalling 
            let response = await axios.get('http://localhost:5000/booking/readfordisplay');
            return response;
        }
        
        // eslint-disable-next-line
        getDisplayData()
        .then((res)=>{
            setBooking(res.data);
        })  
    }, [])

    useEffect(() => {
        console.log("rerender")
    })
    

    return (
        <div className='container'>
            <div className='row pad'>
                {booking.map(instance=>{
                    console.log(instance);
                    return(
                      <BCard instance={instance}></BCard>  
                    )
                })}
            </div>
        </div>
    );
};

export default AdminPage;
