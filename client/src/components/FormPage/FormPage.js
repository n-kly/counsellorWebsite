import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TextForm from "./TextForm";
import TimeDisplay from "./TimeDisplay";
import DateCalendar from './DateCalendar';
import Button from "react-bootstrap/Button"
import axios from 'axios'
import dayjs from 'dayjs';
import Calendar from 'react-calendar';

let available = []
let booked = []
let regionBooked = []

function FormPage() {
  let calendarData;

  const [key,setKey] = useState(false)
  const [success, setSuccess] = useState(false)
  const [dateData, setDateData] = useState(new Date());
  const [formData, setFormData] =  useState({
    uniName: '',
    uniRepName: '',
    uniRepJobTitle: '',
    uniRepEmail: '',
    uniRegion: '',
  })
  
  

  const handleSubmit = (e) =>  {
    e.preventDefault()

    const bookingDateInfoInstance = { //change true
      aptDate: dateData,
      status: "Booked",
      booking: {
          uniName: formData.uniName,
          uniRepName: formData.uniRepName,
          uniRepJobTitle: formData.uniRepJobTitle,
          uniRepEmail: formData.uniRepEmail,
          uniRegion: formData.uniRegion
      }
    }
    setSuccess(true)
    axios.post('http://localhost:5000/booking/create', bookingDateInfoInstance)
  }

  useEffect(async () => {
    if (formData.uniRegion!==''){

      async function getRegionData() {
        let response = await axios.get('http://localhost:5000/booking/readforform')
        return response
      }

      calendarData = (await getRegionData()).data
      
      calendarData.forEach((instance) =>{
          if(instance.status === "Available"){
            console.log("available")
            available.push(dayjs(instance.aptDate).format('DD/MM/YYYY'))

          } else if(instance.booking.uniRegion === formData.uniRegion){
            console.log("region booked")
            regionBooked.push(dayjs(instance.aptDate).format('DD/MM/YYYY'))

          } else if(instance.status === "Booked"){
            console.log("booked")
              booked.push(dayjs(instance.aptDate).format('DD/MM/YYYY'))
          }
        }
      )
      setKey(!key)
   }
  }, [formData.uniRegion])

  return (
    <div className="container">
      <div className='row align-items-center'>
        <div className='col '>
          <TextForm isReadOnly={success} formData={formData} setFormData={setFormData}/>
        </div>
        <div className='col '>
          <DateCalendar available={available} booked={booked} regionBooked={regionBooked} success={success} selectedDate={dateData} setSelectedDate={setDateData} />
        </div>
      </div>
      <div className='row align-items-center gy-5'>
        <div className='col '>
          <TimeDisplay date={dateData}/>
        </div>
        <div className='col'>
          <div className="d-grid gap-2">
            <Button className={success? 'disabled button' : 'button'} as="input" type="submit" value="Submit" onClick={handleSubmit}/>
          </div>
        </div>
      </div>
      <h5 id="successSubmit" className={success? 'alert-success' : 'hidden'} >Thank you for signing up for the BISH virtual presentation, you will receive an email shortly with the details of your booking.</h5>
    </div>
  );
}

export default FormPage;

