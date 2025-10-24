import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import { IoBicycleSharp } from "react-icons/io5"; // Import the specific icon
import { BsBasketFill } from "react-icons/bs";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to control collapse menu

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ul className="navbar-nav sidebar sidebar-dark accordion" 
        id="accordionSidebar" 
        style={{ backgroundColor: '#000000ff' }}  // Set background color
    >
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <IoBicycleSharp size={45} /> {/* React icon */}
        </div>
        <div className="sidebar-brand-text mx-3">Ride Craft</div>
      </a>

      {/* Divider */}
      <hr className="sidebar-divider my-0" />

      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      
      {/* <hr className="sidebar-divider" />     
      <div className="sidebar-heading">
        Interface
      </div> 
      <li className="nav-item">
        <button
          className="nav-link collapsed btn btn-link"
          type="button"
          onClick={toggleCollapse}
          aria-expanded={isCollapsed ? "true" : "false"}
        >
          <i className="fas fa-fw fa-cogs"></i>
          <span>Components</span>
        </button>

        
        <div className={`collapse ${isCollapsed ? 'show' : ''}`} id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Components:</h6>
            <Link className="collapse-item" to="/buttons">Buttons</Link>
            <Link className="collapse-item" to="/cards">Cards</Link>
          </div>
        </div>
      </li> */}

      {/* New Nav Items for Add Product and Product List */}
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">
        Products
      </div>

      {/* Add Product */}
      <li className="nav-item">
        <Link className="nav-link" to="/add-product">
          <i className="fas fa-plus-circle"></i>
          <span>Add Product</span>
        </Link>
      </li>

      {/* Product List */}
      <li className="nav-item">
        <Link className="nav-link" to="/products">
          <i className="fas fa-list-ul"></i>
          <span>Product List</span>
        </Link>
      </li>


      {/* Divider */}
      

            {/* Add Product */}
      {/* <li className="nav-item">
        <Link className="nav-link" to="/add-collection">
          <i className="fas fa-plus-circle"></i>
          <span>Collections</span>
        </Link>
      </li> */}
      <li className="nav-item">
        <Link className="nav-link" to="/order">
          <i className="fas fa-plus-circle"></i>
          <span>Order</span>
        </Link>
      </li>
      <hr className="sidebar-divider d-none d-md-block" />
      <li className="nav-item">
        <Link className="nav-link" to="/contact-details">
          <i className="fas fa-plus-circle"></i>
          <span>Contacts</span>
        </Link>
      </li>

      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};

export default Sidebar;
