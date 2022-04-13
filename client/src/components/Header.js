import React from "react";
import { Link } from "react-router-dom";
import './head.css';

export default function Header() {
    return (
        <div className="fullhead">
            <Link to="/"> <img className="iconhead" src={"https://images.unsplash.com/photo-1518281361980-b26bfd556770?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNjaGVkdWxlJTIwdGltZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"} /></Link>
            <Link to='/'> <span className="heading">Schedule Time</span></Link>
            <div className="lefthead">
                <Link to='/'><span className="log"> Login</span></Link>
                <Link to='/register'><span className="reg"> Register</span></Link>
            </div>
        </div>
    )
}