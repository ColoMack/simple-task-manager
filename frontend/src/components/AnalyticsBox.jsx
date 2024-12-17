import React from "react";

import "../styles/Dashboard.css";

const AnalyticsBox = ({ totalTasks, pendingTasks, highPriorityTasks, completedTasks }) => {
    return(
        <div className="analytics-canvas">
            <div className="analytics-box">
                <div className="analytics-info">
                    <span>Total Tasks:</span>
                    <span>{totalTasks}</span>
                </div>
                <div className="analytics-info">
                    <span>Pending Tasks:</span>
                    <span>{pendingTasks}</span>
                </div>
                <div className="analytics-info">
                    <span>High Priority Tasks:</span>
                    <span>{highPriorityTasks}</span>
                </div>
                <div className="analytics-info">
                    <span>Completed Tasks:</span>
                    <span>{completedTasks}</span>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsBox;