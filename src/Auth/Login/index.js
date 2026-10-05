import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../Assest/logo.jpeg";
import "./index.css";


const Login = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {

        if (!formData.email || !formData.password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post("http://localhost:8000/api/admin/login",
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            if (response.status === 200) {
                alert("Login Successful ✅");

                // 🔐 Token store
                localStorage.setItem("admin_access_token", response.data.admin_access_token);
                navigate("/");
            }

        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "❌ Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* <ToastContainer position="top-right" autoClose={4000} /> */}
            <ToastContainer
                position="top-center"
                autoClose={4000}
                style={{ top: "39%", left: "32%", transform: "translate(-50%, -50%)" }}
                toastStyle={{ width: "auto" }}
            />
            <div className="lf-wrapper">
                <div className="lf-card">

                    {/* LEFT SIDE */}
                    <div className="lf-left">
                        <div className="lf-brand">
                            <div className="lf-logo">{`{ METTEO-BIANCHI }`}</div>
                            {/* <span>Admin</span> */}
                        </div>

                        <h2 className="lf-heading">Welcome Back!</h2>
                        <p className="lf-subtext">
                            Sign in to access your dashboard and continue optimizing your admin process.
                        </p>

                        <div className="lf-field">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="lf-field">
                            <label>Password</label>
                            <div className="lf-password">
                                <input
                                    type="password"
                                    // type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span className="lf-eye">👁</span>
                                {/* <span
                                className="lf-eye"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword ? "🙈" : "👁"}
                            </span> */}

                            </div>
                        </div>

                        <div className="lf-forgot">Forgot Password?</div>

                        <button
                            className="lf-btn"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "SIGN IN"}
                        </button>

                        <p className="lf-bottom">
                            Don’t have an Account? <Link to="/registration" className="link-navigtion">Sign Up</Link>
                        </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="lf-right">
                        <h1>
                            Revolutionize QA with
                            <br />
                            Smarter Automation
                        </h1>

                        <p className="lf-quote">
                            “Admin panel has completely transformed our testing process. It’s reliable,
                            efficient, and ensures our releases are always top-notch.”
                        </p>

                        <div className="lf-profile">
                            <div className="lf-avatar">
                                <img src={logo} className="logo-icon" alt="logo" />
                            </div>
                            <div>
                                <strong>METTEO-BIANCHI</strong>
                                <p>Software Engineer at DevCore</p>
                            </div>
                        </div>

                        <div className="lf-teams">
                            <span className="lf-teams-title">JOIN 1K TEAMS</span>

                            <div className="lf-teams-list">
                                <span>Discord</span>
                                <span>Mailchimp</span>
                                <span>Grammarly</span>
                                <span>Attentive</span>
                                <span>HelloSign</span>
                                <span>Intercom</span>
                                <span>Square</span>
                                <span>Dropbox</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Login;
