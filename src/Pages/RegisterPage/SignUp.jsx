import React, { useState, useEffect } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import "../RegisterPage/RegisterPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';  // Import Firebase Auth
import { validateSignUp } from "./Validation";  // Import validation function


const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState(false);

    const [data, setData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
    });

    const handleChange = (e) => {
        const newObj = { ...data, [e.target.name]: e.target.value };
        setData(newObj);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const validationErrors = validateSignUp(data);
        setError(validationErrors);
        setSubmit(true);
    };

    useEffect(() => {
        if (submit) {
            if (Object.keys(error).length === 0) {
                // If no validation errors
                createUserWithEmailAndPassword(auth, data.email, data.password)
                    .then(() => {
                        setTimeout(() => {
                            navigate("/login");
                        }, 2000); // Delay navigation for 2 seconds
                    })
                    .catch((error) => {
                        // Display Firebase error message
                        const errorMessage = getFirebaseErrorMessage(error.code);
                        setError({ general: errorMessage });
                    })
                    .finally(() => {
                        // Reset submit state after operation
                        setSubmit(false);
                    });
            } else {
                // If validation errors exist
                setSubmit(false);
            }
        }
    }, [submit, error, data.email, data.password, navigate]);

    const getFirebaseErrorMessage = (code) => {
        switch (code) {
            case 'auth/email-already-in-use':
                return '* Email already in use.';
            case 'auth/invalid-email':
                return '* Invalid email address.';
            case 'auth/weak-password':
                return '* Password is too weak.';
            default:
                return '* An error occurred. Please try again.';
        }
    };

    return (
        <div className="container">
            <div className="container-form">
                <form onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <p>Please fill in the details below.</p>
                    <div className="inputBox">
                        <AiOutlineUser className='fullName' />
                        <input
                            type='text'
                            name="fullname"
                            id="fullname"
                            value={data.fullname}
                            onChange={handleChange}
                            placeholder='Full Name'
                        />
                    </div>
                    {error.fullname && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.fullname}</span>}

                    <div className="inputBox">
                        <FiMail className='mail' />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
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
                            value={data.password}
                            onChange={handleChange}
                            placeholder='Password'
                        />
                    </div>
                    {error.password && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.password}</span>}

                    <div className="inputBox">
                        <RiLockPasswordLine className='password' />
                        <input
                            type="password"
                            name="confirmpassword"
                            id="confirmPassword"
                            value={data.confirmpassword}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                        />
                    </div>
                    {error.confirmpassword && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.confirmpassword}</span>}

                    {error.general && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{error.general}</span>}

                    <div className='divBtn'>
                        <button type='submit' className='loginBtn'>SIGN UP</button>
                    </div>
                </form>

                <div className='dont'>
                    <p>Already have an account? <Link to="/login"><span>Sign in</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
