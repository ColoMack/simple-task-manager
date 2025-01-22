import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import ModalOverlay from "../components/ModalOverlay";
import EditTaskForm from "../components/EditTaskForm";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Dashboard.css";

const TaskList = ({ 
    tasks,
    fetchError,
    isLoading,
    onNewTaskClick,
    onTaskUpdated,
    onTaskDeleted,
}) => {

    // for editing a task
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const navigate = useNavigate();

    const handleEditSubmit = (updatedTask) => {
        // task update logic
        console.log("Updated task: ", updatedTask);
        setIsEditModalOpen(false);
    };

    // handle deletion of a task
    const handleDeleteTask = async (id) => {
        
        const token = localStorage.getItem("token");

        if (window.confirm("Are you sure you want to delete this task?")) {
            try {

                await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // update state to remove the deleted task
                onTaskDeleted(id);
                // navigate("/dashboard");

                if (window.location.pathname === `/tasks/${id}`) {
                    navigate("/dashboard");
                }

            } catch (error) {
                
                console.error("Error deleting task: ", error.response?.data || error.message);

            }
        }
    };

    // display loading indicator
    if (isLoading) {
        return <LoadingIndicator />
    }
    
    return(
        <div className="section-2">
            <div className="heading-div">
                <div className="heading-tasks">
                    <span>Your tasks.</span>
                </div>
                <div className="new-task-div">
                    <button onClick={onNewTaskClick} className="new-task-btn">New Task</button>
                </div>
            </div>

            {/* error message on unsuccessful fetch */}
            {fetchError && <p className="fetch-error-message">{fetchError}</p>}

            {/* if no tasks were found */}
            {!fetchError && tasks.length === 0 && (
                <LoadingIndicator message="No tasks available." />
            )}

            {tasks.map((task) =>(
                <div className="task-list-div" key={task.id}>
                    <Link to={`/tasks/${task.id}`} className="ind-task">
                        <div className="ind-task-heading">
                            <div className="ind-heading">
                                <span>{task.title}</span>
                            </div>
                            <div className="ind-icon-div">
                                <button onClick={() => handleDeleteTask(task.id)}><img src="/assets/icons/delete_icon.svg" alt="Delete" /></button>
                                <button><img src="/assets/icons/more_info_icon.svg" alt="More Info" /></button>
                            </div>
                        </div>
                        <div className="ind-task-content">
                            <div className="ind-info ind-due-date">
                                <span>Due Date:</span>
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="ind-info ind-priority">
                                <span>Priority:</span>
                                <span>{task.priority}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
            
            {isEditModalOpen && (
                <ModalOverlay onClose={() => setIsEditModalOpen(false)}>
                    <EditTaskForm
                        task={currentTask}
                        onSubmit={handleEditSubmit}
                        onClose={() => setIsEditModalOpen(false)}
                    />
                </ModalOverlay>
            )}

        </div>
    );
}

export default TaskList;