import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import "./index.css";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: false,
  });


  // 🔹 Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 🔹 Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please accept Terms & Conditions");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:8000/api/admin/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }
      );

      if (response.status === 200) {
        alert("Account Created Successfully ✅");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }

    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <div className="logo">METTEO-BIANCHI</div>
          <button className="back-btn">Back to website →</button>

          <div className="caption">
            <h2>Capturing Moments,<br />Creating Memories</h2>
            <div className="dots">
              <span></span>
              <span></span>
              <span className="active"></span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <h1>Create an account</h1>
          <p className="login-text">
            Already have an account? <Link to="/login" className="link-navigtion">Log in</Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="name-row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="password-box">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="eye">👁</span>
            </div>

            <label className="checkbox">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <span>
                I agree to the <a href="#">Terms & Conditions</a>
              </span>
            </label>

            <button className="submit-btn" disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;
