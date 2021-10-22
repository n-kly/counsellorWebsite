import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import {
	AiOutlineClose,
	AiFillLock,
	// eslint-disable-next-line
	AiFillUnlock,
	AiOutlineQuestionCircle,
} from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import './sidebar2.css';
import Navbar from 'react-bootstrap/Navbar'
import {Nav, NavDropdown} from 'react-bootstrap';

const Sidebar2 = () => {
    const [sidebar, setSidebar] = useState(false); // Toggle sidebar visibility
	const toggleSidebar = () => setSidebar(!sidebar); // Seperate function as bugfix

    return (
        <>
        <div className='wCube'></div>
        <div>
            <Navbar bg="light">
                <Navbar.Brand className='bars' as={Link} onClick={()=>{toggleSidebar()}}>
                    <div className='burgerpad'>
                        <div className={!sidebar?'burger':'burger-close'}></div>
                    </div>
                </Navbar.Brand>
                    <Nav className={sidebar?"me-auto sidebar-active":"me-auto sidebar-inactive"}>
                        <Nav.Link as={NavLink} to='/'>
                            <span><BsPencilSquare /> Form</span>
                        </Nav.Link>

                        <NavDropdown title={<span><AiFillLock /> Admin</span>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#edit">
                                <Nav.Link as={NavLink} to='/admin/booking' className='nopad'>
                                    <span><BsPencilSquare /> Bookings</span>
                                </Nav.Link>
                            </NavDropdown.Item>

                            <NavDropdown.Item href="#dates">
                                <Nav.Link as={NavLink} to='/admin/calendar' className='nopad'>
                                    <span><BsPencilSquare /> Calendar</span>
                                </Nav.Link>
                            </NavDropdown.Item>

                            <NavDropdown.Item href="#email">
                                <Nav.Link as={NavLink} to='/admin/emails' className='nopad'>
                                    <span><BsPencilSquare /> Emails</span>
                                </Nav.Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={NavLink} to='/support'>
                            <span><AiOutlineQuestionCircle /> Help</span>
                        </Nav.Link>
                    </Nav>
            </Navbar>
        </div>
        </>
    )
}

export default Sidebar2
