import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import  '../componentscss/Navbar.css'
import {useNavigate} from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";

export default function Navbar(props) {
    const navigate= useNavigate()
  return (
    <div>
     
    <div className='container-fluid backgrounds-navbar xy navbar '>
        <button className='rounded-5 m-2 primary-light  '  style={{height:"40px"}}     onClick={()=>(navigate('/notify',{state:{name:props.name,email:props.email}}))}> Notification <IoIosNotifications  /> </button>
        <div style={{color:"white" ,fontWeight:"bold"}}> {props.name} </div>
        <div  style={{color:"white" ,fontWeight:"bold"}}  className='m-2'  > {props.email}  </div>
        
      </div>
    </div>
  )
}
