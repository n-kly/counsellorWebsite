import {useState} from "react";
import Card from 'react-bootstrap/Card'
import '../admin.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import validateCouns from "./validateCouns";

const CCard = ({instance,setEmails}) => {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState({});

    const [counsInfo, setCounsInfo] = useState({
        name:instance.name,
        counsEmail:instance.counsEmail,
        receiveEmail:instance.receiveEmail,
    })

    const [tempCounsInfo, setTempCounsInfo] = useState({
        name:instance.name,
        counsEmail:instance.counsEmail,
        receiveEmail:instance.receiveEmail,
    })

    function cancel(){
        setCounsInfo(tempCounsInfo)
        setShow(false)
    }

    function handleOpen(){
        setTempCounsInfo(counsInfo)
        setShow(true);
        setValidated(false);
    }

    async function getEmail(){
        let res = await  axios.get('http://localhost:5000/couns/read')
        return res
    }

    async function edit(){
        if(!(Object.keys(validateCouns(counsInfo)).length === 0)){
            setError(validateCouns(counsInfo));
            setValidated(true);
        } else{
            const token = localStorage.getItem('adminToken')
            
            if(!!token){
                const verify = await axios.post('http://localhost:5000/login/verify', {adminToken:token})
                
                if(verify){
                    setValidated(false);
            
                    counsInfo.id = instance._id

                    axios.patch('http://localhost:5000/couns/edit', counsInfo);
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
                axios.delete('http://localhost:5000/couns/remove', {data: {id:instance._id}})
                .then(()=>{
                    // eslint-disable-next-line
                    getEmail()
                    .then((res)=>{
                        setEmails(res.data);
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
                    <Modal.Title>{tempCounsInfo.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label> ID </Form.Label>
                            <Form.Control 
                                type='text' 
                                value={instance._id} 
                                readOnly={true}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Counsellor Name </Form.Label>
                            <Form.Control
                                type='text' 
                                defaultValue={tempCounsInfo.name}
                                onChange={(e) => {
							        setCounsInfo({...counsInfo,name: e.target.value,})
                                }}
                                isInvalid={validated?!!error.name:false}
                                isValid={validated?!error.name:false}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Email </Form.Label>
                            <Form.Control
                                type='text' 
                                defaultValue={tempCounsInfo.counsEmail}
                                onChange={(e) => {
							        setCounsInfo({...counsInfo,counsEmail: e.target.value,})
                                }}
                                isInvalid={validated?!!error.counsEmail:false}
                                isValid={validated?!error.counsEmail:false}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label> Receive Emails? </Form.Label>
                            <Form.Control
                                type='checkbox'
                                defaultChecked={tempCounsInfo.receiveEmail} 
                                onChange={(e)=> {
                                    setCounsInfo({...counsInfo,receiveEmail: e.target.value,})
                                }}
                                isInvalid={validated?!!error.receiveEmail:false}
                                isValid={validated?!error.receiveEmail:false}
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

            <div className='col-6 pad'>
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title className='cardUni'>{counsInfo.name}</Card.Title>
                        <Card.Text className='cardEmail'>{counsInfo.counsEmail}</Card.Text>
                        <Card.Text className='cardTitle'>{'Receive Emails?: '+counsInfo.receiveEmail}</Card.Text>
                        <Button variant="primary" className="cardButton" onClick={() => {handleOpen()}}>Edit</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default CCard
