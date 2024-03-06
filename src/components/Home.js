import React,{useEffect, useState} from 'react'
import '../componentscss/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
import { FaUserGroup } from "react-icons/fa6";
import {app} from '../firebase/firebase'
import{getDatabase,ref,push,set,get} from "firebase/database"


export default function Home() {
    const [name,setName]=useState("");
    const[ email,setEmail]=useState('');
    const navigate= useNavigate()
    const [userides,setUserides]=useState([]);

const fetchArray= async()=>{
  const db= getDatabase(app);
  const dbRef= ref(db,"chat");
  const  snapshot = await get(dbRef);
  if(snapshot.exists()){
    const data=snapshot.val();//convert json data into javascript object format
    setUserides(Object.keys(data));
    console.log(userides)
  }


}
const handlealreadyuser= async(e)=>{
   await fetchArray()
  if(userides.includes(email)){
const db= getDatabase(app);
const dbRef=ref(db,`chat/${email}/online`);
const snapshot=await get(dbRef);
if(snapshot.exists){
  const mydata= snapshot.val();
  const array= Object.keys(mydata);
  set(dbRef, { [array[0]]: { ...mydata[array[0]], onlines: false } });
}



    navigate('/mainapp',{state:{name:name,email:email}})
  }else{
    alert("oops my love , you  need to go for new user")
  }

}
const handlenewuser=(e)=>{
  fetchArray()
  if(userides.includes(email)){
    alert("oops my love you alreay a user  and rem meber your unique id")
  }else{
    const  db= getDatabase(app);
    const newdbref=push(ref(db,`chat/${email}/online`));
    set(newdbref,{
      onlines:true
    }).then(()=>{
      alert("your online route is set up")
    }).catch(()=>{
      alert("there is error")
    })




    navigate('/mainapp',{state:{name:name,email:email}})
  }
}
useEffect(()=>{
  fetchArray();
})


  return (
   <div className='background'>
        
        <div><h1 className='display app-name ' >
          Team App   <FaUserGroup /></h1></div>
          <div className='y p'>
          <div className='container '>
            <div className='row m-2'>
              <div className='col option-style'>Name</div>
              <div className='col mt-2'> <input    value={name} onChange={(e)=>{setName(e.target.value)}} type='text'/></div>
            </div>
            <div className='row m-2'>
              <div className='col option-style'>unique id</div>
              <div className='col mt-2'> <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type='text'/></div>
            </div>
            <div className='row m-2'>
           <div className='col'> <button className=' button rounded primary-light' style={{heiight:"30px"}} onClick={ (e)=>handlealreadyuser(e)}> already a user </button></div>
           <div className='col'> <button className=' button rounded primary-light' style={{heiight:"30px"}} onClick={ (e)=>handlenewuser(e)}> new user </button></div>
            </div>


          </div>



          </div>


   </div>
  )
}
