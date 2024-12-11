import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/NewTaskForm.css";

const EditTaskForm = ({ task = {}, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "", // remove the timestamp part
        priority: task.priority || "Low",
        status: task.status || "To Do",
    });

    useEffect(() => {
        // this is to avoid creating an infinite loop and a dependancy issue by resetting the state of the form fields
        if (task) {
            setFormData((prev) => {
                if (
                    prev.title !== task.title ||
                    prev.description !== task.description ||
                    prev.dueDate !== task.dueDate ||
                    prev.priority !== task.priority ||
                    prev.status !== task.status
                ) {
                    return {
                        title: task.title || "",
                        description: task.description || "",
                        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
                        priority: task.priority || "Low",
                        status: task.status || "To Do",
                    };
                }
                return prev;
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            
            const response = await axios.put(`http://localhost:5000/api/tasks/${task.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            onSubmit(response.data);

        } catch (error) {

            console.error("Error updating task: ", error.response?.data || error.message);

        }
    };

    

    return (
        <div className="form-canvas">
            <div className="back-btn-div">
                <Link to="/dashboard" className="form-back-btn">
                    <img src="/assets/icons/arrow_backward_icon.svg" alt="" />
                    <span>Back</span>
                </Link>
            </div>
            <div className="task-form-heading">
                <span>Edit task.</span>
            </div>
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="task-field-div">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="task-field-div">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="short-info-div">
                    <div className="task-field-div">
                        <label>Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="task-field-div">
                        <label>Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="task-field-div">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="action-btns">
                    <button type="submit">Update Task</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
                
            </form>
        </div>
        
    )
};

export default EditTaskForm;