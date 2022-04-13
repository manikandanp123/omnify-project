import React from "react";
import { Link,useNavigate } from "react-router-dom";
import './head.css';
import { AiFillSchedule } from "react-icons/ai";

export default function HeaderL() {
    const navigate=useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="fullhead">
            <Link to="/schedule"> <img className="iconhead" src={"https://images.unsplash.com/photo-1518281361980-b26bfd556770?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNjaGVkdWxlJTIwdGltZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"} /></Link>
            <Link to='/schedule'> <p className="heading">Schedule Time</p></Link>
            <div className="lefthead100">
                <Link to='/pastschedule'><p > <AiFillSchedule className="pas" /></p></Link>
                <p className="out" onClick={logout} > Log Out</p>
            </div>
        </div>
    )
}