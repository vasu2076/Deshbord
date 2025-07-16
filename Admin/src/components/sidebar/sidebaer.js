import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaBell } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { mycontext, MyContext } from "../../App";
import { FaUser } from "react-icons/fa";
import {useNavigate} from "react-router-dom"

const Sidebar = () => {
        const [activeTab, setActiveTab] = useState(null);
     const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
     const context = useContext(mycontext);
     
       const isOpenSubmenu = (index) => {
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    }

  return (
  <div className='sidebar'>
    <ul>
        <li>
            <Link to ="/Dashboard">
               <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} >
                <span className='icons'><MdDashboard/></span>
                Dashboard
                <span className='arrows'><FaAngleRight/></span>
            </Button>
            </Link>
        </li>
        <li>
             <Button className={`w-100 ${activeTab === 1 && isToggleSubmenu === true ? 'active' : ''}`} onClick={()=>isOpenSubmenu(1)}>
                            <span className="icons"><FaProductHunt /></span>
                            Products
                            <span className="arrows"><FaAngleRight /></span>
            </Button>
             <div className={`submenu-wrapper ${ activeTab === 1 && isToggleSubmenu === true ? 'expanded' : 'collapsed'}`}>
                            <ul className="submenu">
                                <li> <Link to="/products"> Product List</Link> </li>
                                <li> <Link to="/products/details"> Product View</Link> </li>
                                <li> <Link to="/products/upload"> Product Upload</Link> </li>
                            </ul>
                        </div>
        </li>
        <li>
              <Link to ="/">
               <Button className={`w-100 ${activeTab === 2 ? 'active' : ''}`} >
                            <span className="icons"><FaCartArrowDown /></span>
                            Orders
                            <span className="arrows"><FaAngleRight /></span>
            </Button>
            </Link>
        </li>
        <li>
              <Link to ="/">
               <Button className={`w-100 ${activeTab === 3 ? 'active' : ''}`} >
                            <span className="icons"><MdEmail /></span>
                            Messages
                            <span className="arrows"><FaAngleRight /></span>
            </Button>
            </Link>
        </li>
        <li>
              <Link to ="/">
               <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} >
                            <span className="icons"><FaBell /></span>
                            Notificatrions
                            <span className="arrows"><FaAngleRight /></span>
            </Button>
            </Link>
        </li>
        <li>
              <Link to ="/">
             <Button className='w-100'>
                            <span className="icons"><IoMdSettings /></span>
                            Setting
                            <span className="arrows"><FaAngleRight /></span>
            </Button>
            </Link>
        </li>
        <li>
              <Link to ="/login">
             <Button className='w-100'>
                            <span className="icons"><FaUser /></span>
                            Login
            </Button>
            </Link>
        </li>
        <li>
              <Link to ="/SignUp">
             <Button className='w-100'>
                            <span className="icons"><FaUser /></span>
                             Sign Up
            </Button>
            </Link>
        </li>
    </ul>
     <br />
                <div className="logout-wrapper">
                    <div className="logout-box">
                        <Link to='/login'>
                        <Button variant="contained"> <IoMdLogOut /> Logout</Button>
                        </Link>
                    </div>
                </div>
  </div>
  )
}

export default Sidebar