import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../../../Redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (key === "profilePic" && val.length > 0) {
        formData.append("profilePic", val[0]);
      } else {
        formData.append(key, val);
      }
    });
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (isError) {
      alert(message);
      dispatch(reset());
    }
    if (isSuccess) {
      alert("Registration successful! Please login.");
      dispatch(reset());
      formReset();
      navigate("/login");
    }
  }, [isError, isSuccess, message, dispatch, navigate, formReset]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 rounded-3 shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-center mb-4 fw-bold text-success">Create Account</h3>

              <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                {/* Name & Email & Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Create a password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone</label>
                  <input
                    type="text"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="Phone number"
                    {...register("phone", { required: "Phone number is required" })}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your address"
                    {...register("address")}
                  />
                </div>

                {/* Country, State, District, Pincode */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Country</label>
                    <input type="text" className="form-control" {...register("country")} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">State</label>
                    <input type="text" className="form-control" {...register("state")} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">District</label>
                    <input type="text" className="form-control" {...register("district")} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Pincode</label>
                    <input type="text" className="form-control" {...register("pincode")} />
                  </div>
                </div>

                {/* Profile Picture */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Profile Picture</label>
                  <input type="file" className="form-control" {...register("profilePic")} />
                </div>

                {/* Submit */}
                <div className="d-grid mt-4">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg fw-semibold rounded-5"
                  >
                    Register
                  </button>
                </div>

                <p className="text-center mt-3 mb-0">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none text-success fw-semibold"
                    onClick={() => navigate("/login")}
                  >
                    Login here
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

export default Register;
