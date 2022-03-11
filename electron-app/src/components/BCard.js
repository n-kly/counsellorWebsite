// Booking card template 

import {useState} from "react";
import dayjs from "dayjs";
import Card from 'react-bootstrap/Card'
import image from './undraw_Page_not_found_re_e9o6.png'
import '../admin.css'


const BCard = ({instance}) => {
  const [date, setDate] = useState(instance.aptDate);
  const [bookingData, setBookingData] = useState({
		uniName: instance.booking.uniName,
        uniRegion: instance.booking.uniRegion,
		uniRepJobTitle: instance.booking.uniRepJobTitle,
		uniRepName: instance.booking.uniRepName,
		uniRepEmail: instance.booking.uniRepEmail,
        logoUrl:instance.booking.logoUrl,
	});

  return (
      <>
      <div className='col-4 pad'>
        <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title className='cardUni'>{bookingData.uniName}</Card.Title>
                <Card.Subtitle className='cardRegion'>{bookingData.uniRegion}</Card.Subtitle>
            </Card.Body>
            <Card.Img variant="top" src={!!bookingData.logoUrl?bookingData.logoUrl:image} className='cardImage'/>
            <Card.Body>
                <Card.Text className='cardDate'>{dayjs(date).format('dddd, MMMM D')}</Card.Text>
                <Card.Text className='cardTitle'>{bookingData.uniRepJobTitle + ': ' + bookingData.uniRepName}</Card.Text>
                <Card.Text className='cardEmail'>{bookingData.uniRepEmail}</Card.Text>
            </Card.Body>
        </Card>
      </div>
      </> 
  )
}

export default BCard