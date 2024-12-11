import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/NewTaskForm.css";

const NewTaskForm = ({ onClose, onTaskAdded }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        status: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // sumbit the input content
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post("http://localhost:5000/api/tasks",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            onTaskAdded(response.data); //notify the parent component that content is sent
            onClose();

        } catch (error) {

            console.error("Error adding task: ", error);

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
                <span>Enter details for new task.</span>
            </div>
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="task-field-div">
                    <label>Task Name</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="task-field-div">
                    <label>Task Description</label>
                    <textarea 
                        name="description" 
                        id=""
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Add a description for your task"
                        rows="4"
                        required
                    ></textarea>
                    
                </div>
                <div className="short-info-div">
                    <div className="task-field-div">
                        <label>Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="task-field-div">
                        <label>Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="task-field-div">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    
                </div>
                <div className="action-btns">
                    <button type="submit">Add Task</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
            
        </div>
    );
}

export default NewTaskForm;