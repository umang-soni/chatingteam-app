import React,{useState, useEffect} from 'react';
import '../componentscss/Mainapp.css'
import { useLocation } from 'react-router-dom';
import {app} from '../firebase/firebase'
import{getDatabase,ref,push,set,get} from "firebase/database"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import { BsFillChatFill } from "react-icons/bs";




export default function Mainapp() {
  const location=useLocation();
  const {state}=location;
  const{name,email}=state;
  const[team,setTeam]=useState([]);
  const[teammemberName, setteammember]=useState('');
  const[teamemail,setteamemail]=useState('')
  const[message ,setMessage]=useState('');
  const[already,setAlready]=useState([])

  const fetchdata=async()=>{
    const db=getDatabase(app);
    const dbRef=ref(db,`chat/${email}/team`);
    const  snapshot = await get(dbRef);
    if(snapshot.exists()) {
      const mydata=snapshot.val();
      const temp=Object.keys(mydata).map(itemid=>{
        return{
          ...mydata[itemid],
          id:itemid
        }
      })
      setTeam(temp); 

    }
    }


    const saveData= async ()=>{
      const db= getDatabase(app);
      const newdocRef=push(ref(db, `chat/${email}/team`));
      set(newdocRef,{
        teamName:teammemberName,
        teammail:teamemail
      }).then((data)=>{
        alert("data save successfully")
      }).catch((error)=>{
        console.log(error)
      })
    }



    


    const  handleAdd= async()=>{
    const db=getDatabase(app);
    const dbref= ref(db,"chat");
    const snapshot=  await get(dbref);
    if(snapshot.exists){
       const mydata=snapshot.val();
      setAlready(Object.keys(mydata))
    }
console.log(already)
 if(already.includes(teamemail)){
  
  saveData()
  fetchdata();
 }
 else{
  alert("incorrect user")
 }





    }


    
useEffect(()=>{
  const p=async()=>{
    const db=getDatabase(app);
    const dbref= ref(db,"chat");
    const snapshot=  await get(dbref);
    if(snapshot.exists){
       const mydata=snapshot.val();
      setAlready(Object.keys(mydata))
    }
console.log(already)
  }
  p()
  fetchdata();



},[])
    const  handlesend =async (e)=>{
      const att1Value = e.target.getAttribute('att1');
      const att2Value = e.target.getAttribute('att2');
      const db= getDatabase(app);
      const docref=ref(db,`chat/${att2Value}/`)
      const newdocRef=push(ref(db, `chat/${att2Value}/notification`));
     
        set(newdocRef,{
         from:email,
         message:message
        }).then((data)=>{
          alert("data save successfully")
        }).catch((error)=>{
          console.log(error)
        })

      


}
  
  
  return (
    <div className='backgr'>
     
<div><Navbar name={name} email={email}/></div>

 <div className=' ' style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>     
<div  className="background-main">
     <div className=' left-div m-5 '>
     <div className=' container mt-5  '>
   {
    team.map((iteam)=>{
      return(
        <div className='row m-3 '> 
       
          <div className='col cu' >
          {iteam.teammail}
          </div>
          <div className='col'>
            <button  att1={iteam.teamName} att2={iteam.teammail}  className='primary-light rounded-5'  onClick={(e)=>handlesend(e)} >send</button>
            </div>
            <div className='col cu' >
            <button className='rounded-5' > chat <BsFillChatFill /> </button>
            </div>
            

        </div>
      )
    })
   }

            </div>





     </div>

      <div className=' right-div m-3'>


        <div className='container m-4'>
          <div className='row'>
            <div className='col m-3 option-style'>

             ADD MEMBER
          </div>
          </div>
          
          <div className='row'>
            <div className='col m-2 option-style2'>
            Uniqid:
          </div>
          <div className='col m-2'>
            <input type='text' value={teamemail} onChange={(e)=>{setteamemail(e.target.value)}} />
          </div>
          </div>
          <div className='row'>
            <div className='col m-2'>
              <button          onClick={handleAdd}> add</button>
            </div>

          </div>
          <div className='row'>
            <div col>
            <select val={"select user"}  onChange={(e)=>(setteamemail(e.target.value))} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
             <option selected  > select the user from given below </option>
             {
              already.map((item)=>{
                return(<option value={item}> {item}</option>)
              })
             }
</select>
            </div>

          </div>



        </div>

      </div>




       



       </div>
       <div className='container-fluid'> <input  className='message rounded-5'  style={{color:"white"}}  value={message} placeholder='write message and click on send button'   onChange={(e)=>{setMessage(e.target.value)}} type='text'/></div>
       <button   className='rounded m-5'   onClick={(e)=>setMessage("")}>reset</button>
    </div>
    </div>
   
 
  )
}
