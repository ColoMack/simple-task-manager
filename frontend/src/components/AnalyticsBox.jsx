import React from "react";

import "../styles/Dashboard.css";

const AnalyticsBox = () => {
    return(
        <div className="analytics-canvas">
            <div className="analytics-box">
                <div className="analytics-info">
                    <span>Total Tasks:</span>
                    <span>7</span>
                </div>
                <div className="analytics-info">
                    <span>Pending Tasks:</span>
                    <span>5</span>
                </div>
                <div className="analytics-info">
                    <span>High Priority Tasks:</span>
                    <span>4</span>
                </div>
                <div className="analytics-info">
                    <span>Completed Tasks:</span>
                    <span>3</span>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsBox;