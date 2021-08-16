import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TextForm from "./TextForm";
import TimeDisplay from "./TimeDisplay";
import DateCalendar from './DateCalendar';
import Button from "react-bootstrap/Button"
import axios from 'axios'
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import validateInfo from './validateForm'


dayjs.extend(isBetween)

let available = []
let booked = []
let regionBooked = []

function FormPage() {
  let calendarData;

  const [checkDate,setCheckDate] = useState(false)
  const [validated,setValidated] = useState(false)
  const [error,setError] = useState({})
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

    const bookingDateInfoInstance = { 
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
    setCheckDate(!checkDate)
    if(Object.keys(validateInfo(bookingDateInfoInstance)).length === 0){
      setSuccess(true)
      axios.put('http://localhost:5000/booking/create', bookingDateInfoInstance)
    } else{
      setError(validateInfo(bookingDateInfoInstance))
      setValidated(true)
    }
  }

  useEffect(async () => {
    if (formData.uniRegion!==''){
      async function getRegionData() {
        let response = await axios.get('http://localhost:5000/booking/readforform')
        return response
      }

      calendarData = (await getRegionData()).data
     
      available = []
      booked = []
      regionBooked = []
      
      calendarData.forEach((instance,index) =>{
          if(instance.booking.uniRegion === formData.uniRegion){
            booked.push(dayjs(instance.aptDate).format('DD/MM/YYYY'))
            
            let lowB = dayjs(instance.aptDate).add(7,'day').format('DD/MM/YYYY')
            let uppB = dayjs(instance.aptDate).subtract(7,'day').format('DD/MM/YYYY')

            if((index-1)>=0){
              if(calendarData[index-1].status === "Available" && dayjs(calendarData[index-1]).isBetween(lowB,uppB,null,'[]')){
                regionBooked.push(dayjs(calendarData[index-1].aptDate).format('DD/MM/YYYY'))
                calendarData[index-1].status = "Region booked"
              } 
            }

            if((index+1)<=(calendarData.length-1)){
              if(calendarData[index+1].status === "Available" && dayjs(calendarData[index+1]).isBetween(lowB,uppB,null,'[]')){
                regionBooked.push(dayjs(calendarData[index+1].aptDate).format('DD/MM/YYYY'))
                calendarData[index+1].status = "Region booked"
              } 
            }
          }
        })

        calendarData.forEach((instance) =>{
          if(instance.status === "Available"){
            available.push(dayjs(instance.aptDate).format('DD/MM/YYYY'))
            
          } else if(instance.status === "Booked"){
            booked.push(dayjs(instance.aptDate).format('DD/MM/YYYY'))
          }
        }
      )
      
      if(booked.includes(dayjs(dateData).format('DD/MM/YYYY')) || regionBooked.includes(dayjs(dateData).format('DD/MM/YYYY'))){
        setDateData(new Date())
      }

      setKey(!key)
    }
  }, [formData.uniRegion,checkDate])

  return (
    <div className="container">
      <div className='row align-items-center'>
        <div className='col '>
          <TextForm 
          validated={validated} 
          errors = {error} 
          isReadOnly={success} 
          formData={formData} 
          setFormData={setFormData}/>

        </div>
        <div className='col '>
          <DateCalendar
          validated={validated} 
          errors = {error} 
          available={available} 
          booked={booked} 
          regionBooked={regionBooked} 
          success={success} 
          selectedDate={dateData} 
          setSelectedDate={setDateData} />

        </div>
      </div>
      <div className='row align-items-center gy-5'>
        <div className='col '>
          <TimeDisplay 
          date={dateData}/>

        </div>
        <div className='col'>
          <div className="d-grid gap-2">
            <Button className={success? 'disabled button' : 'button'} 
            as="input" 
            type="submit" 
            value="Submit" 
            onClick={handleSubmit}/>

          </div>
        </div>
      </div>
      <h5 id="successSubmit" className={success? 'alert-success' : 'hidden'} >Thank you for signing up for the BISH virtual presentation, you will receive an email shortly with the details of your booking.</h5>
    </div>
  );
}

export default FormPage;

