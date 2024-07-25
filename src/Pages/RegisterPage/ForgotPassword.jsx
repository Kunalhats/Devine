import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';  // Adjust the path as needed
import { sendPasswordResetEmail } from 'firebase/auth';
import './ForgotPassword.css';  // Make sure this path is correct

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Password reset email sent!");
        } catch (error) {
            setError("Failed to send password reset email.");
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-form">
                <h1>Forgot Password</h1>
                <p>Please enter your email address to reset your password.</p>
                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    {message && <span className="message">{message}</span>}
                    {error && <span className="error">{error}</span>}
                    <button type="submit" className="submit-btn">Send Password Reset Email</button>
                </form>
                <div className="back-to-login">
                    <button onClick={() => navigate("/login")} className="login-btn">Back to Login</button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
