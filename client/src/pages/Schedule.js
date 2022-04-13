import axios from "axios";
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./all.css";
import Header from "../components/Header";
import HeaderL from "../components/HeaderL";

const Schedule=()=>{
    const navigate=useNavigate();
    const [details,setDetails]=useState({name:'',description:'',start_time:'',end_time:'',day:''});

    const istokenAvailable=localStorage.getItem("token");
    
    const changeDetails=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setDetails({...details,[name]:value})
        console.log(details);
    }

    const submitDetails=async(e)=>{
        console.log(details);
        if(!istokenAvailable){
            alert("Login to schedule time");
            navigate("/");
        }else{
            const res=await axios.post("/schedule/add",details,{headers:{Authorization:"test "+istokenAvailable}});
            console.log(res.data.data);
            navigate('/pastschedule');           
        }
    }

    return(
        <div className="eachitem">
            {istokenAvailable?<HeaderL />:<Header /> } 

                <div className="full">
                    <h2>Schedule Events </h2>
                    <form  >
                        <label for="name" >Name : </label><input name="name" onChange={changeDetails} type="text" value={details.name}  /><br/>
                        <label for='description' >Description : </label><input name="description" onChange={changeDetails} type="text" height="100" value={details.description} /><br/>
                        <label for='start_time' >Start Time : </label><input name="start_time" onChange={changeDetails} type="datetime-local" value={details.start_time}/><br/>
                        <label for='end_time' >End Time : </label><input name="end_time" onChange={changeDetails} type="datetime-local" value={details.end_time}/><br/>
                        <label for='day' >Day of Week : </label><input  name="day" onChange={changeDetails} type="text" value={details.day}/><br/>
                        <input className="sub" onClick={submitDetails} value="Submit"/>
                    </form>
                </div>

        </div>
    )
}

export default Schedule;