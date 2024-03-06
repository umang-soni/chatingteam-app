import React, { useEffect,useState } from 'react'
import '../componentscss/Notification.css'
import {app} from '../firebase/firebase'
import{getDatabase,ref,push,set,get} from "firebase/database"
import{useNavigate,useLocation} from "react-router-dom"
import { TbSend } from "react-icons/tb";

export default function Notification() {
  const navigate=useNavigate();
  const location=useLocation();
  const {state}=location;
  const{name,email}=state;


  const[notiarray,setNotiarray]=useState([])
  const fetchdata= async()=>{
    const db= getDatabase(app);
    const dbref=ref(db,`chat/${email}/notification`);
    const snapshot= await get(dbref);
    if(snapshot.exists()){
      setNotiarray(Object.values(snapshot.val()))
    }else{
      alert("oops no messages")
    }
  }
  useEffect(()=>{


fetchdata()



  },[notiarray])
  return (
    <div className='backgroundnotification'>
      <div  className='not-back' style={{overflow:"auto"}}>
     <div className='container  ' >

      <div className='row m-5'>
        <dv className="col display t rounded"> Notifications</dv>
        
      </div>
      {
        notiarray.map((item)=>{
        return( <div className='row m-5'>
              <div className='col t rounded '> {item.from}</div>
              <div className='col-2'> <TbSend  style={{color:"white",height:"30px"}}/>   </div>
              <div className='col'><div className='t rounded'>
                {item.message}
                </div></div>
           
           
            
          </div>)
        })
      }
      

     </div>





      </div>
      
    </div>
  )
}
