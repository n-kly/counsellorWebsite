import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TextForm from "./TextForm";
import TimeDisplay from "./TimeDisplay";
import DateCalendar from './DateCalendar';
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Alert } from 'bootstrap';
// import { BrowserRouter, Route, Link } from "react-router-dom";

function FormPage() {
  const [success, setSuccess] = useState(false)
  const [dateData, setDateData] = useState(new Date());
  const [formData,setFormData] =  useState({
    uniName: '',
    uniRepName: '',
    uniRepJobTitle: '',
    uniRepEmail: '',
    uniRegion: '',
  })
  
  const handleSubmit = (e) =>  {
    e.preventDefault()

    const bookingDateInfoInstance = { //change true
      date: dateData,
      status: "Booked",
      booking: {
          uniName: formData.uniName,
          uniRepName: formData.uniRepName,
          uniRepJobTitle: formData.uniRepJobTitle,
          uniRepEmail: formData.uniRepEmail,
          uniRegion: formData.uniRegion
      }
    }
    setSuccess(!success)
    axios.post('http://localhost:5000/booking/create', bookingDateInfoInstance)
  }

  return (
    <div className="container">
      <div className='row align-items-center'>
        <div className='col'>
          <TextForm formData={formData} setFormData={setFormData}/>
        </div>
        <div className='col'>
          <DateCalendar selectedDate={dateData} setSelectedDate={setDateData} />
        </div>
      </div>
      <div className="row align-items-center">
        <div className='col'>
          <TimeDisplay date={dateData}/>
        </div>
        <div className='col'>
            <Button as="input" type="submit" value="Submit" onClick={handleSubmit}/>
        </div>
      </div>
      <h5 className="alert-success">Thank you for signing up for the BISH virtual presentation, you will receive an email shortly with the details of your booking.</h5>
    </div>
  );
}

export default FormPage;

