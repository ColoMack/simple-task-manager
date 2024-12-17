import React, { useState, useEffect } from "react";
import axios from "axios";

import Topbar from "../components/Topbar";
import AnalyticsBox from "../components/AnalyticsBox";
import TaskList from "../components/TaskList";
import ModalOverlay from "../components/ModalOverlay";
import NewTaskForm from "../components/NewTaskForm";

import "../styles/Dashboard.css";

const Dashboard = () => {

    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fetchError, setFetchError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Fetch all tasks
    useEffect(() => {
      const fetchTasks = async () => {
        const token = localStorage.getItem("token");

        try {

          const response = await axios.get("http://localhost:5000/api/tasks", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTasks(response.data);
          setFetchError("");

        } catch (error) {

          console.error("Error fetching tasks: ", error.response?.data || error.message);
          setFetchError("Failed to load tasks.");

        } finally {

            setIsLoading(false);
            
        }
      };

      fetchTasks();
    }, []);

    // Analytics data calculations
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter((task) => task.status === "To Do").length;
    const highPriorityTasks = tasks.filter((task) => task.priority === "High").length;
    const completedTasks = tasks.filter((task) => task.status === "Completed").length;

    const handleTaskAdded = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks((prevTasks) => 
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    const handleTaskDeleted = (deletedTaskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletedTaskId));
    };

    return(
        <div className="dashboard-canvas">
            <Topbar />

            <div className="dashboard-content-box">
                <AnalyticsBox 
                    totalTasks={totalTasks}
                    pendingTasks={pendingTasks}
                    highPriorityTasks={highPriorityTasks}
                    completedTasks={completedTasks}
                />

                <TaskList 
                    onNewTaskClick={() => setIsModalOpen(true)} 
                    tasks={tasks}
                    isLoading={isLoading}
                    fetchError={fetchError}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                />
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