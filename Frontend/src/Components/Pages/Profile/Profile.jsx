import React from "react";
import { useSelector } from "react-redux";
import Logout from "../Login/Logout";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning shadow-sm" role="alert">
          Please login first to view your profile.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row g-4">
        {/* Left: Profile Picture */}
        <div className="col-md-4 d-flex justify-content-center">
          <div className="profile-image-container">
            {user.profilePic ? (
              <img
                src={`https://ridecraft-backend.onrender.com${user.profilePic}`}
                alt="Profile"
                className="rounded-circle border border-3 border-gray shadow-sm"
                width="375"
                height="375"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                className="bg-light rounded-circle border d-flex align-items-center justify-content-center mx-auto shadow-lg"
                style={{ width: 375, height: 375 }}
              >
                <span className="text-muted">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Bio & Other Details */}
        <div className="col-md-8">
          <div className="card  border-0 rounded-4">
            <div className="card-body">
              <h3 className="fw-bold text-left mb-5" style={{fontSize:"50px"}}>{user.name}</h3>

              {/* Bio and Details */}
              <div className="row mb-2">
                <div className="col-5 fw-semibold text-dark">Email:</div>
                <div className="col-7 text-dark">{user.email}</div>
              </div>
              {user.phone && (
                <div className="row mb-2">
                  <div className="col-5 fw-semibold text-dark">Phone:</div>
                  <div className="col-7 text-dark">{user.phone}</div>
                </div>
              )}
              {user.address && (
                <div className="row mb-2">
                  <div className="col-5 fw-semibold text-dark">Address:</div>
                  <div className="col-7 text-dark">{user.address}</div>
                </div>
              )}
              {user.country && (
                <div className="row mb-2">
                  <div className="col-5 fw-semibold text-dark">Country:</div>
                  <div className="col-7 text-dark">{user.country}</div>
                </div>
              )}
              {user.state && (
                <div className="row mb-2">
                  <div className="col-5 fw-semibold text-dark">State:</div>
                  <div className="col-7 text-dark">{user.state}</div>
                </div>
              )}
              {user.district && (
                <div className="row mb-2">
                  <div className="col-5 fw-semibold text-dark">District:</div>
                  <div className="col-7 text-dark">{user.district}</div>
                </div>
              )}
              {user.pincode && (
                <div className="row mb-2">
                  <div className="col-5 fw-semibold text-dark">Pincode:</div>
                  <div className="col-7 text-dark">{user.pincode}</div>
                </div>
              )}

              {/* Logout Button */}
              <div className="d-grid mt-5 w-80 ">
                <Logout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
