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

const BCardAdd = ({setBooking}) => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false)

	const [date, setDate] = useState("Month/Day/Year"); // Store appointment date
    const [tempDate, setTempDate] = useState("Month/Day/Year"); // Store for cancel

    const [bookingData, setBookingData] = useState({ // Store booking information
		uniName: "University Name",
        uniRegion: "University Region",
		uniRepJobTitle: "Rep Title",
		uniRepName: "Rep Name",
		uniRepEmail: "Rep Email",
	});
    const [tempBooking, setTempBooking] = useState({ // Store for cancel
		uniName: "University Name",
        uniRegion: "University Region",
		uniRepJobTitle: "Rep Title",
		uniRepName: "Rep Name",
		uniRepEmail: "Rep Email",
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

    function create(){
        if(!(Object.keys(validateInfo(bookingData,date)).length === 0)){
            setError(validateInfo(bookingData,date));
            setValidated(true);
        } else{
            setValidated(false);
            
            let bookingDateInfoInstance = {
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
            
            axios.post('http://localhost:5000/booking/createm', bookingDateInfoInstance)
            .then(()=>{
                // eslint-disable-next-line
                getDisplayData()
                .then((res)=>{
                    setBooking(res.data);
                })
            }).then(setShow(false));  
        }      
    }

    return (
        <>
            <Modal show={show} onHide={cancel} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>University Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label> University Name </Form.Label>
                            <Form.Control 
                                type='text' 
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
                    <Button variant="success" onClick={()=>{create()}} >
                        Create Booking
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='col-4 pad'>
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title className='cardUni'>University Name</Card.Title>
                        <Card.Subtitle className='cardRegion'>University Region</Card.Subtitle>
                    </Card.Body>
                    <Card.Img variant="top" src={image} className='cardImage'/>
                    <Card.Body>
                        <Card.Text className='cardDate'>Date</Card.Text>
                        <Card.Text className='cardTitle'>Rep Title: Rep Name</Card.Text>
                        <Card.Text className='cardEmail'>Rep Email</Card.Text>
                        <Button variant="success" className="cardButton" onClick={() => {handleOpen()}}>Add</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default BCardAdd

