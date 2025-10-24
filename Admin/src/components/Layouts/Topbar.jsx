import React from "react";

const Topbar = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
        type="button"
      >
        <i className="fa fa-bars"></i>
      </button>

      {/* Topbar Search */}
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button
              className="btn btn-dark"
              type="button"
              style={{ backgroundColor: "#000000ff" }}
            >
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>

      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Alerts */}
        <li className="nav-item dropdown no-arrow mx-1">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="alertsDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-bell fa-fw"></i>
            <span className="badge bg-danger badge-counter">3+</span>
          </a>
          <div
            className="dropdown-list dropdown-menu dropdown-menu-end shadow animated--grow-in"
            aria-labelledby="alertsDropdown"
          >
            <h6 className="dropdown-header">Alerts Center</h6>
            <a className="dropdown-item text-center small text-gray-500" href="#">
              Show All Alerts
            </a>
          </div>
        </li>

        {/* Messages */}
        <li className="nav-item dropdown no-arrow mx-1">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="messagesDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-envelope fa-fw"></i>
            <span className="badge bg-danger badge-counter">7</span>
          </a>
          <div
            className="dropdown-list dropdown-menu dropdown-menu-end shadow animated--grow-in"
            aria-labelledby="messagesDropdown"
          >
            <h6 className="dropdown-header">Message Center</h6>
            <a className="dropdown-item text-center small text-gray-500" href="#">
              Read More Messages
            </a>
          </div>
        </li>

        {/* Divider */}
        <div className="topbar-divider d-none d-sm-block"></div>

        {/* User Information */}
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline  small" style={{color:"#000000ff", fontWeight:"700", fontSize:"16px"}}>
              {admin?.name || "Admin"}
            </span>
            <img
              className="img-profile rounded-circle"
              src={
                admin?.image ||
                "https://ahaanmedia.com/designing/design/RideCraft.png"
              }
              alt="Admin"
              style={{ width: "40px", height: "40px" }}
            />
          </a>
          <div
            className="dropdown-menu dropdown-menu-end shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            {/* <a className="dropdown-item" href="#">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Settings
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              Activity Log
            </a>
            <div className="dropdown-divider"></div> */}
            <button
              className="dropdown-item text-danger"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Topbar;
