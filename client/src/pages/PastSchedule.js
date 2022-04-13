import Header from "../components/Header";
import {AiFillDelete} from "react-icons/ai";
import React,{useState,useEffect} from "react";
import HeaderL from "../components/HeaderL";
import { useNavigate ,Link} from "react-router-dom";
import "./all.css";
import axios from "axios";

const PastSchedule=()=>{
    const navigate=useNavigate();

    const istokenAvailable=localStorage.getItem("token");
    const [details,setDetails]=useState([]);
    
    let fullTotal=0;
   
    useEffect(()=>{
        let token=localStorage.getItem("token");
        if(!token){
            alert("Login to add items to cart")
            navigate("/");
        }
        async function fetchData(){
            const res=await axios.get("/schedule/get",{headers:{Authorization:"test "+istokenAvailable}});
            console.log(res.data.data);
            setDetails(res.data.data);
            if(!res.data.data){
                alert("schedule is Empty, add schedules");
            }
        }
        fetchData();
    },[])

    console.log(details);

    const oneDelete=(id)=>{
        console.log(id);
        async function dataDelete(){
            const res=await axios.delete(`schedule/delete/${id}`,{headers:{Authorization:"test "+istokenAvailable}});
            console.log(res.data.data)
            window.location.reload(false)
        }
        dataDelete();
    }
    
    return(
        <div>
        {istokenAvailable?<HeaderL />:<Header /> } 
        <div className="fullcart">
            <table border="2" cellPadding={"20"}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Day</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((detail,index)=>{
                        return(
                        <tr key={index}>
                            <td>{detail.name} </td>
                            <td>{detail.description} </td>
                            <td>{detail.start_time} </td>
                            <td>{detail.end_time} </td>
                            <td>{detail.day} </td>
                            <td>
                                {detail.date}
                            </td>
                            <td><button> <AiFillDelete onClick={()=>{oneDelete(detail._id)}} className="delbtn" /></button> </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default PastSchedule;