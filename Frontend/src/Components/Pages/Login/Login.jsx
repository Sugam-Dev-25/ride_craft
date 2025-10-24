import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../../../Redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isError) {
      alert(message);
      dispatch(reset());
    }
    if (isSuccess || user) {
      navigate("/profile");
      dispatch(reset());
    }
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card  border-0 rounded-3">
            <div className="card-body p-4">
              <h3 className="text-center mb-4 fw-bold text-warning">Login to Your Account</h3>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter your password"
                    {...register("password", { required: "Password is required" })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-warning btn-lg fw-semibold rounded-5">
                    Login
                  </button>
                </div>

                <p className="text-center mt-3 mb-0">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none text-warning fw-semibold"
                    onClick={() => navigate("/register")}
                  >
                    Register here
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
