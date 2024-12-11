import React, { useState } from "react";

import Topbar from "../components/Topbar";
import AnalyticsBox from "../components/AnalyticsBox";
import TaskList from "../components/TaskList";
import "../styles/Dashboard.css";
import ModalOverlay from "../components/ModalOverlay";
import NewTaskForm from "../components/NewTaskForm";

const Dashboard = () => {

    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTaskAdded = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return(
        <div className="dashboard-canvas">
            <Topbar />

            <div className="dashboard-content-box">
                <AnalyticsBox />

                <TaskList onNewTaskClick={() => setIsModalOpen(true)} />
            </div>

            {/* render the modal overlay conditionally */}
            {isModalOpen && (
                <ModalOverlay onClose={() => setIsModalOpen(false)}>
                    <NewTaskForm onClose={() => setIsModalOpen(false)} onTaskAdded={handleTaskAdded}>

                    </NewTaskForm>
                </ModalOverlay>
            )}
        </div>
    );
};

export default Dashboard;