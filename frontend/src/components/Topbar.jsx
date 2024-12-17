import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Dashboard.css";

const Topbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("token");
            navigate("/");
        }
    };

    return (
        <div className="topbar">
            <div className="logo-div">
                <span className="logo-span">TaskFlow</span>
            </div>
            <div className="logo-btn">
                {/* <button className="search-icon">
                    <img src="/assets/icons/search_icon.svg" alt=""/>
                </button> */}
                <button onClick={handleLogout} className="sign-out-btn">Log out</button>
            </div>
        </div>
    );
};

export default Topbar;