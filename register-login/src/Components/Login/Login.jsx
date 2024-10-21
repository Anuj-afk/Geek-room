import React, { useEffect, useState } from "react"; // Import the CSS file for styling
import { Link } from "react-router-dom";
import side from "../static/side.png";
import glogo from "../static/google.png";
import flogo from "../static/facebook.png";
import ilogo from "../static/instagram.png";
import AxiosInstance from "../axios";

const Login = () => {
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Email:", userName);
        console.log("Password:", password);

        let url = "/grapp/getUsers";
        const res = await AxiosInstance.post(url, 
            JSON.stringify({
                "userName": userName,
                "password": password,
            })
        );

        const result = await res.data;
        if(result.completed){
            console.log("Login Successful");
            window.location.href = "https://www.geekroom.in"; // Redirect to dashboard page
        }
        else{
            console.log(result.error);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-image-container">
                {/* You can put your image here */}
                <img src={side} alt="Background" className="auth-image" />
            </div>
            <div className="auth-form-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">User Name</label>
                        <input type="text" id="userName" onChange={(e) => setuserName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </form>
                <p style={{ marginTop: "20px" }}>
                    Don't have an account?{" "}
                    <a href="/Geek-room/register">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
