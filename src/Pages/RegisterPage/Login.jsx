import React, { useState, useEffect } from 'react';
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import "../RegisterPage/RegisterPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';  // Adjust the path as needed
import { validateLogin } from './Validation';  // Adjust the path as needed


const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const newObj = { ...data, [e.target.name]: e.target.value };
        setData(newObj);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(validateLogin(data));
        setSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(error).length === 0 && submit) {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then(() => {
                    navigate("/home");  // Navigate to home page on successful login
                })
                .catch((error) => {
                    let errorMessage = "An error occurred. Please try again.";
                    if (error.code === "auth/invalid-email") {
                        errorMessage = "Invalid email format.";
                    } else if (error.code === "auth/user-not-found") {
                        errorMessage = "Account does not exist. Please sign up.";
                    } else if (error.code === "auth/wrong-password") {
                        errorMessage = "Incorrect password.";
                    }
                    setError({ general: errorMessage });
                });
        }
    }, [error, submit, data.email, data.password, navigate]);

    return (
        <div className="container">
            <div className="container-form">
                <form onSubmit={handleSignIn}>
                    <h1>Login</h1>
                    <p>Please sign in to continue.</p>
                    <div className="inputBox">
                        <FiMail className='mail' />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            placeholder='Email'
                        />
                    </div>
                    {error.email && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.email}</span>}

                    <div className="inputBox">
                        <RiLockPasswordLine className='password' />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                            placeholder='Password'
                        />
                    </div>
                    {error.password && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.password}</span>}

                    {error.general && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.general}</span>}

                    <div className='divBtn'>
                        <Link to="/forgot-password" className='FG'>Forgot Password?</Link>
                        <button type='submit' className='loginBtn'>LOGIN</button>
                    </div>
                </form>

                <div className='dont'>
                    <p>Don't have an account? <Link to="/signup"><span>Sign up</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
