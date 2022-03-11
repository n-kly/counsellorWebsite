import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const Login = ({show,cancel,setShow,error,setError,setAdmin}) => {
    const [loginfo, setLoginfo] = useState({email:'',password:''})
    

    async function handleSubmit(){
        await axios.post('http://localhost:5000/login/login', loginfo)
        .then((res)=>{
            if(res.data === "FALSE"){
                setError(true)

            } else{
                setAdmin(true)
                localStorage.setItem('adminToken', res.data.adminToken) // Store admin token in local storage
                setShow(false)
            }
        })
        .catch(err =>{
            console.log(err)
        });   
    }
    
    return (
        <Modal show={show} onHide={cancel}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label> Email </Form.Label>
                    <Form.Control type='text' onChange={(e) => {setLoginfo({...loginfo,email:e.target.value})}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label> Password </Form.Label>
                    <Form.Control type='password' onChange={(e) => {setLoginfo({...loginfo,password:e.target.value})}}/>
                </Form.Group>
                {error?
                <div className="incorrect">
                    Incorrect Password/Email
                </div>
                :<div></div>
                }
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>{handleSubmit()}}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Login
