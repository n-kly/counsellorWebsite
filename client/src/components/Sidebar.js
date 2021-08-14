import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import {
    AiOutlineClose,
    AiFillLock,
    AiFillUnlock,
    AiOutlineQuestionCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const toggleSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaBars onClick={toggleSidebar} />
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={toggleSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiOutlineClose />
                        </Link>
                    </li>
                    <li className="nav-text">
                        <Link to="/">
                            <BsPencilSquare />
                            <span>Form</span>
                        </Link>
                    </li>
                    <li className="nav-text">
                        <Link to="/admin">
                            <AiFillLock />
                            <span>Admin</span>
                        </Link>
                    </li>
                    <li className="nav-text bottom">
                        <Link to="/support">
                            <AiOutlineQuestionCircle />
                            <span>Help</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;
