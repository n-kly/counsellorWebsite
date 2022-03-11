// Sidebar for client side routing

import React, { useEffect, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { FaCalendarPlus, FaCalendarAlt,  } from 'react-icons/fa'
import { AiFillLock, AiFillUnlock, AiOutlineQuestionCircle } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md'
import { Link, NavLink } from 'react-router-dom';
import './sidebar2.css';
import Navbar from 'react-bootstrap/Navbar'
import {Nav, NavDropdown} from 'react-bootstrap';
import Login from './Login';
import axios from 'axios';

const Sidebar2 = ({admin,setAdmin}) => {
    const [sidebar, setSidebar] = useState(false); // Toggle sidebar visibility
	const toggleSidebar = () => setSidebar(!sidebar); // Seperate function as bugfix
    
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);

    useEffect(async () => {
        const token = localStorage.getItem('adminToken')
        if(!!token){
            const verify = await axios.post('http://localhost:5000/login/verify', {adminToken:token})
            if(verify){
                setAdmin(true)
            }
        }
    }, [])

    function isAdmin(){
        if(admin){ 
            return(
                <NavDropdown title={<span><AiFillUnlock size={22}/> Admin</span>} className="nav-text">
                    <NavDropdown.Item href="#edit">
                        <Nav.Link as={NavLink} to='/admin/booking' className='nopad'>
                            <span><FaCalendarPlus size={20}/> Bookings</span>
                        </Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#dates">
                        <Nav.Link as={NavLink} to='/admin/calendar' className='nopad'>
                            <span><FaCalendarAlt size={20}/> Calendar</span>
                        </Nav.Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#email">
                        <Nav.Link as={NavLink} to='/admin/emails' className='nopad'>
                            <span><MdEmail size={20}/> Emails</span>
                        </Nav.Link>
                    </NavDropdown.Item>
                </NavDropdown>
            )
        } else {
            return(
                <Nav.Link onClick={()=>{setShow(true);setError(false)}} className="nav-text">
                    <span><AiFillLock size={22}/> Admin</span>
                </Nav.Link>
            )
        }
    }

    function cancel(){
        setShow(false)
    }

    return (
        <>
        <div className='wCube'></div>
        <Login show={show} cancel={cancel} setShow={setShow} error={error} setError={setError} setAdmin={setAdmin}/>
        <div>
            <Navbar bg="light">
                <Navbar.Brand className='bars' as={Link} onClick={()=>{toggleSidebar()}}>
                    <div className='burgerpad'>
                        <div className={!sidebar?'burger':'burger-close'}></div>
                    </div>
                </Navbar.Brand>
                    <Nav className={sidebar?"me-auto sidebar-active":"me-auto sidebar-inactive"}>
                        <Nav.Link as={NavLink} to='/' className="nav-text">
                            <span className='nav-icon'><BsPencilSquare size={22}/> Form</span>
                        </Nav.Link>
                        {isAdmin()}
                        <Nav.Link as={NavLink} to='/support' className="nav-text">
                            <span><AiOutlineQuestionCircle size={22}/> Help</span>
                        </Nav.Link>
                    </Nav>
            </Navbar>
        </div>
        </>
    )
}

export default Sidebar2
