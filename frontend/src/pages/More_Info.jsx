import React, {useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Topbar from "../components/Topbar";
import EditTaskForm from "../components/EditTaskForm";
import ModalOverlay from "../components/ModalOverlay";
import "../styles/Dashboard.css";
import "../styles/MoreInfo.css";

const MoreInfo = () => {

    const { id } = useParams(); // get the task id from the URL
    const [task, setTask] = useState(null); // store the task details
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleClearState = () => {
        setTask(null);
    }

    // handle fetching single task info
    useEffect(() => {
        const fetchTask = async () => {
            const token = localStorage.getItem("token");

            try {

                const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTask(response.data);
                setError("");

            } catch (err) {

                if (err.respons?.status === 404) {
                    console.error("Task not found, redirecting to dashboard.");
                    navigate("/dashboard");
                } else {
                    console.error("Error fetching task: ", err.response?.data || err.message);
                    setError("Failed to fetch task details.");
                }

            } finally {

                setIsLoading(false);

            }
        };

        fetchTask();

        return () => handleClearState();
    }, [id, navigate]);

    // incase of refetching of the task details
    const fetchTask = async () => {
        const token = localStorage.getItem("token");

        try {
            
            const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTask(response.data);
            setError("");

        } catch (err) {

            console.error("Error fetching task: ", err.response?.data || err.message);
            setError("Failed to re-fetch task details.");

        }
    };

    // handling editing task
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // handle deleting a task
    const handleDelete = async () => {
        const token = localStorage.getItem("token");

        if (window.confirm("Are you sure you want to delete this task?")) {
            try {

                await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                navigate("/dashboard");

            } catch (err) {
                console.error("Error deleting task: ", err.response?.data || err.message);
                setError("Failed to delete task.");
            }
        }

        return () => handleClearState();
    };

    if (error) {
        return <p className="fetch-error-message">{error}</p>
    }

    if (isLoading) {
        return <p>Loading task details...</p>
    }
    
    return(
        <div className="dashboard-canvas">
            <Topbar />

            <div className="dashboard-content-box">
                <div className="section-2 mt-4">
                    <div className="heading-div">
                        <div className="heading-tasks">
                            <span>Your tasks.</span>
                        </div>
                        <div className="new-task-div">
                            <button onClick={() => setIsEditModalOpen(true)} className="new-task-btn">Edit Task</button>
                        </div>
                    </div>
                    <div className="back-btn-div mb-3">
                        <Link to="/dashboard" className="back-btn">
                            <img src="/assets/icons/arrow_backward_icon.svg" alt="" />
                            <span>Back</span>
                        </Link>
                    </div>
                    <div className="task-info-canvas">
                        <div className="ind-task-heading">
                            <div className="ind-heading">
                                <span>{task.title}</span>
                            </div>
                            <div className="ind-icon-div">
                                <button onClick={handleDelete}><img src="/assets/icons/delete_icon.svg" alt="" /></button>
                            </div>
                        </div>
                        <div className="task-description-div">
                            <div className="task-description">
                                <span>
                                    {task.description}
                                </span>
                            </div>
                            <div className="due-info">
                                <div>
                                    <span>Due Date:</span>
                                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span>Priority:</span>
                                    <span>{task.priority}</span>
                                </div>
                                <div>
                                    <span>Status:</span>
                                    <span>{task.status}</span>
                                </div>
                            </div>
                            <div className="created-info">
                                <div>
                                    <span>Created at:</span>
                                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span>Last updated at:</span>
                                    <span>{new Date(task.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>

            {/* modal overlay for editing task */}
            {isEditModalOpen && (
                <ModalOverlay onClose={() => setIsEditModalOpen(false)}>
                    <EditTaskForm
                        task={task}
                        onSubmit={(updatedTask) => {
                            fetchTask();
                            setTask(updatedTask);
                            setIsEditModalOpen(false);
                        }}
                        onClose={() => setIsEditModalOpen(false)}
                    />
                </ModalOverlay>
            )}

        </div>
    );
};

export default MoreInfo;