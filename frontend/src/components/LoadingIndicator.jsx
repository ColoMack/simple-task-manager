import React from "react";

import "../styles/LoadingIndicator.css";

const LoadingIndicator = ({ message = "Loading..." }) => {
    return (
        <div className="loading-container">
            <div className="loading-div">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default LoadingIndicator;