import {useState} from "react";
import Card from 'react-bootstrap/Card'
import image from './maxresdefault.jpg' 
import dayjs from "dayjs";
import '../admin.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import validateInfo from "./validateCreate";

const BCard = ({instance,setBooking}) => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState({date:''});

	const [date, setDate] = useState(instance.aptDate);
    const [tempDate, setTempDate] = useState(instance.aptDate);

    const [bookingData, setBookingData] = useState({
		uniName: instance.booking.uniName,
        uniRegion: instance.booking.uniRegion,
		uniRepJobTitle: instance.booking.uniRepJobTitle,
		uniRepName: instance.booking.uniRepName,
		uniRepEmail: instance.booking.uniRepEmail,
	});
    const [tempBooking, setTempBooking] = useState({
		uniName: instance.booking.uniName,
        uniRegion: instance.booking.uniRegion,
		uniRepJobTitle: instance.booking.uniRepJobTitle,
		uniRepName: instance.booking.uniRepName,
		uniRepEmail: instance.booking.uniRepEmail,
	});

    function cancel(){
        setBookingData(tempBooking)
        setDate(tempDate)
        setShow(false);
    }

    function handleOpen(){
        setTempBooking(bookingData);
        setTempDate(date);
        setValidated(false);
        setShow(true);
    }

    async function getDisplayData() { // Async to prevent stalling 
        let response = await axios.get('http://localhost:5000/booking/readfordisplay');
        return response;
    }

    async function edit(){
        if(!(Object.keys(validateInfo(bookingData,date)).length === 0)){
            setError(validateInfo(bookingData,date));
            setValidated(true);
        } else{
            const token = localStorage.getItem('adminToken')
            
            if(!!token){
                const verify = await axios.post('http://localhost:5000/login/verify', {adminToken:token})
                
                if(verify){
                    setValidated(false);
            
                    let bookingDateInfoInstance = {
                        id:instance._id,
                        aptDate: date,
                        status: 'Booked',
                        booking: {
                            uniName: bookingData.uniName,
                            uniRepName: bookingData.uniRepName,
                            uniRepJobTitle: bookingData.uniRepJobTitle,
                            uniRepEmail: bookingData.uniRepEmail,
                            uniRegion: bookingData.uniRegion,
                        },
                    };

                    axios.patch('http://localhost:5000/booking/editbooking', bookingDateInfoInstance);
                    setShow(false);  
                } else{
                    alert('Invalid authentication token')
                }
            } else{
                alert('Please authenticate by logging in')
            }   
        }      
    }

    async function remove(){
        const token = localStorage.getItem('adminToken')
            
        if(!!token){
            const verify = await axios.post('http://localhost:5000/login/verify', {adminToken:token})
            
            if(verify){
                axios.delete('http://localhost:5000/booking/remove', {data: {id:instance._id}})
                .then(()=>{
                    // eslint-disable-next-line
                    getDisplayData()
                    .then((res)=>{
                        setBooking(res.data);
                    })
                }).then(setShow(false));  
            } else{
                alert('Invalid authentication token')
            }
        } else{
            alert('Please authenticate by logging in')
        }
    }

    return (
        <>
            <Modal show={show} onHide={cancel} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{tempBooking.uniName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group>
                            <Form.Label> ID </Form.Label>
                            <Form.Control 
                                type='text' 
                                value={instance._id} 
                                readOnly={true}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> University Name </Form.Label>
                            <Form.Control
                                type='text' 
                                defaultValue={tempBooking.uniName}
                                onChange={(e) => {
							        setBookingData({...bookingData,uniName: e.target.value,})
                                }}
                                isInvalid={validated?!!error.uniName:false}
                                isValid={validated?!error.uniName:false}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> University Region </Form.Label>
                            <Form.Control
                                type='text' 
                                defaultValue={tempBooking.uniRegion}
                                onChange={(e) => {
							        setBookingData({...bookingData,uniRegion: e.target.value,})
                                }}
                                isInvalid={validated?!!error.uniRegion:false}
                                isValid={validated?!error.uniRegion:false}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Date </Form.Label>
                            <Form.Control
                                type='text' 
                                defaultValue={dayjs(tempDate).format('M/D/YYYY')} 
                                onChange={(e)=> {
                                    setDate(new Date(dayjs(e.target.value)))
                                    
                                }}
                                isInvalid={validated?!!error.date:false}
                                isValid={validated?!error.date:false}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Rep Title </Form.Label>
                            <Form.Control
                                type='text' 
                                defaultValue={tempBooking.uniRepJobTitle}
                                onChange={(e) => {
							        setBookingData({...bookingData,uniRepJobTitle: e.target.value,})
                                }}
                                isInvalid={validated?!!error.uniRepJobTitle:false}
                                isValid={validated?!error.uniRepJobTitle:false}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Rep Name </Form.Label>
                            <Form.Control
                                type='text' 
                                defaultValue={tempBooking.uniRepName}
                                onChange={(e) => {
							        setBookingData({...bookingData,uniRepName: e.target.value,})
                                }}
                                isInvalid={validated?!!error.uniRepName:false}
                                isValid={validated?!error.uniRepName:false}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Rep Email </Form.Label>
                            <Form.Control 
                                type='text' 
                                defaultValue={tempBooking.uniRepEmail}
                                onChange={(e) => {
                                    setBookingData({...bookingData,uniRepEmail: e.target.value,})
                                }}
                                isInvalid={validated?!!error.uniRepEmail:false}
                                isValid={validated?!error.uniRepEmail:false}
                            />
                        </Form.Group>
                    </Form>                                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=>{remove()}} style={{'margin-right':'auto'}}>
                        Delete Booking
                    </Button>
                    <Button variant="primary" onClick={()=>{edit()}} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <div className='col-4 pad'>
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title className='cardUni'>{bookingData.uniName}</Card.Title>
                        <Card.Subtitle className='cardRegion'>{bookingData.uniRegion}</Card.Subtitle>
                    </Card.Body>
                    <Card.Img variant="top" src={image} className='cardImage'/>
                    <Card.Body>
                        <Card.Text className='cardDate'>{dayjs(date).format('dddd, MMMM D')}</Card.Text>
                        <Card.Text className='cardTitle'>{bookingData.uniRepJobTitle + ': ' + bookingData.uniRepName}</Card.Text>
                        <Card.Text className='cardEmail'>{bookingData.uniRepEmail}</Card.Text>
                        <Button variant="primary" className="cardButton" onClick={() => {handleOpen()}}>Edit</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default BCard

