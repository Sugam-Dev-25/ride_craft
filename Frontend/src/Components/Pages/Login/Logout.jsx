import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-danger w-100 fw-semibold py-2 shadow-sm rounded-5"
      type="button"
    >
      <i className="bi bi-box-arrow-right me-2"></i> Logout
    </button>
  );
};

export default Logout;
