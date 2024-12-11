import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Login.css";

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // handle states of the fields
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // handle form validation before submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // check if confirm password matches
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // send the data to backend
        try {

            const response = await axios.post("http://localhost:5000/api/auth/signup", {
                email: formData.email,
                password: formData.password,
            });

            setSuccess("Account created successfully.");
            setError("");

            navigate("/dashboard");

        } catch (err) {

            setError("Failed to create account. Please try again later.");
            setSuccess("");

        }

    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="auth-heading">
                    <span>Sign up for TaskFlow</span> 
                </div>
                
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label className="field-label">EMAIL</label>
                        <input
                            className="field-bar"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label className="field-label">PASSWORD</label>
                        <input
                            className="field-bar"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label className="field-label">CONFIRM PASSWORD</label>
                        <input
                        className="field-bar"
                        type="password" 
                        name="confirmPassword"
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                        />
                    </div>

                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}

                    <button className="submit-button" type="submit">Sign up</button>
                </form>

                <p>
                    Already have an account? <Link to="/">Log in</Link>
                </p>
            </div>

        </div>
    )

};

export default Signup;