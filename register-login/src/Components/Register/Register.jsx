import React, { useState, useEffect } from "react"; // Import the CSS file for styling
import side from "../static/side.png";
import glogo from "../static/google.png";
import flogo from "../static/facebook.png";
import ilogo from "../static/instagram.png";
import AxiosInstance from "../axios";
import { json } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; // Regex for username
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register = () => { // Regex for password

    const [userName, setuserName] = useState("");
    const [validName, setValidName] = useState(false);
    const [userNameError, setUserNameError] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdError, setPwdError] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        let url = "/grapp/addUser"
        const res = await AxiosInstance.post(url, 
            JSON.stringify({
                "email": email,
                "password": password,
                "username": userName,
            })
        )
        const reply = await res.data;
        if(reply.completed) {
            window.location = "http://localhost:5173/Geek-room/login";
            console.log("added successfully!");
        }
        else {
            console.log(reply.error);
        }

        console.log("Email:", email);
        console.log("Password:", password);
    };

    useEffect(() => {
        setValidName(USER_REGEX.test(userName));
        if (!validName) {
            setUserNameError("Username must be 4-24 characters long and can include letters, numbers, dashes, and underscores.");
        } else {
            setUserNameError("");
        }
    }, [userName, validName]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === confirmPassword);
        if (!validPwd) {
            setPwdError("Password must be 8-24 characters long, include an uppercase letter, a number, and a special character.");
        } else {
            setPwdError("");
        }
    }, [password, confirmPassword, validPwd]);

    return (
        <div className="auth-page">
            <div className="auth-image-container">
                <img src={side} alt="Side" className="auth-image" />
            </div>
            <div className="register-auth-form-container">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>User Name:</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                            required
                        />
                        {userName && userNameError && <p className="error-message">{userNameError}</p>} {/* Display error message */}
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {password && pwdError && <p className="error-message">{pwdError}</p>}
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {confirmPassword && !validMatch && <p className="error-message">It does not match password</p>}
                    <button type="submit" className="auth-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
