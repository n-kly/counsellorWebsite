import {useState} from "react";
import Card from 'react-bootstrap/Card'
import image from './maxresdefault.jpg' 
import dayjs from "dayjs";
import './admin.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {AiOutlineClose} from 'react-icons/ai';
import CloseButton from 'react-bootstrap/CloseButton'

const BCard = ({instance}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function edit(){

    }

    function remove(){
        handleClose();

    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{instance.booking.uniName}</Modal.Title>
                    <CloseButton/>
                </Modal.Header>
                <Modal.Body>GG</Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="danger" onClick={()=>{remove()}} >
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
                        <Card.Title className='cardUni'>{instance.booking.uniName}</Card.Title>
                        <Card.Subtitle className='cardRegion'>{instance.booking.uniRegion}</Card.Subtitle>
                    </Card.Body>
                    <Card.Img variant="top" src={image} className='cardImage'/>
                    <Card.Body>
                        <Card.Text className='cardDate'>{dayjs(instance.aptDate).format('dddd, MMMM D')}</Card.Text>
                        <Card.Text className='cardTitle'>{instance.booking.uniRepJobTitle + ': ' + instance.booking.uniRepName}</Card.Text>
                        <Card.Text className='cardEmail'>{instance.booking.uniRepEmail}</Card.Text>
                        <Button variant="primary" className="cardButton" onClick={handleShow}>Edit</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default BCard

