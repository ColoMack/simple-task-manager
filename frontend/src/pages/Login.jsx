import React, { useState } from "react";
import axios from "axios";

import "../styles/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // response from server
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            }, { withCredentials: true, });

            // save the jwt token to the local storage
            localStorage.setItem("token", response.data.token);
            console.log("Token stored: ", response.data.token);

            // redirect user to dashboard
            window.location.href = "/dashboard";

        } catch (err) {

            console.error("Login failed: ", error);
            console.error("Login failed. Backend response: ", error.resposne?.data || error.message);
            // setError("Invalid email or password");
            setError(error.response?.data?.message || "An error occurred");

        }
    };

    return(
        <div className="login-container">
            <div className="login-box">
                <div className="auth-heading">
                    <span>Log in to TaskFlow</span>
                </div>
                
                <form className="auth-form" onSubmit={handleSubmit}> 
                    <div className="input-field">
                        <label className="field-label">EMAIL</label>
                        <input
                        className="field-bar"
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        />
                    </div>

                    <div className="input-field">
                        <label className="field-label">PASSWORD</label>
                        <input
                        className="field-bar"
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        />
                    </div>

                    {error && <p className="error">{error}</p>}
                    <button className="submit-button" type="submit">Log in</button>
                </form>
                <p>
                    No account? <a href="/signup">Sign up</a>
                </p>
            </div>    
        </div>
    )
};

export default Login;
