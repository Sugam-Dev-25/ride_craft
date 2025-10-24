import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Login.css";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", data);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        navigate("/");
      }
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 border-0 " style={{ width: "500px" }}>
        <h4 className="text-center mb-4 fw-bold" style={{color:"#000", fontWeight:"700", fontSize:"40px"}}>Admin Login</h4>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="form-control"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-danger small">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="form-control"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-danger small">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="btn w-100 text-white fw-semibold"
            style={{
              backgroundColor: "#000000ff",
              borderRadius: "50px",
              height: "45px",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
