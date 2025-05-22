import React, { useState } from "react";
import "../../adminCss/sidebar/adminsidebar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import { FiLogOut, FiHome, FiPackage, FiShoppingCart, FiList, FiUsers, FiImage } from "react-icons/fi";

function Adminsidebar() {
  const [selectedItem, setSelectedItem] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={`main_admin_sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggleButton" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '◀' : '▶'}
      </button>
      
      <div className="admin_sidebar">
        <div className="admin_sidebar_header">
          <div className="admin_sidebar_header_logo">
            <img
              loading="lazy"
              alt="logo"
              src={Logo}
              className="admin_sidebar_header_logo_img"
            />
          </div>
        </div>
        
        <div className="admin_sidebar_menu">
          <div className="admin_sidebar_menu_list">
            <Link className="Link_tag" to={"/admin/admin-dashboard"}>
              <div
                className={`admin_sidebar_menu_items ${selectedItem === "Dashboard" && "selected"}`}
                onClick={() => handleMenuItemClick("Dashboard")}
              >
                <FiHome className="menu-icon" />
                <span>Dashboard</span>
              </div>
            </Link>
            
            <Link className="Link_tag" to={"/admin/allproducts"}>
              <div
                className={`admin_sidebar_menu_items ${selectedItem === "All Products" && "selected"}`}
                onClick={() => handleMenuItemClick("All Products")}
              >
                <FiPackage className="menu-icon" />
                <span>Products</span>
              </div>
            </Link>
            
            <Link className="Link_tag" to={"/admin/all-orders"}>
              <div
                className={`admin_sidebar_menu_items ${selectedItem === "All Orders" && "selected"}`}
                onClick={() => handleMenuItemClick("All Orders")}
              >
                <FiShoppingCart className="menu-icon" />
                <span>Orders</span>
              </div>
            </Link>
            
            <Link className="Link_tag" to={"/admin/all-categories"}>
              <div
                className={`admin_sidebar_menu_items ${selectedItem === "All catogory" && "selected"}`}
                onClick={() => handleMenuItemClick("All catogory")}
              >
                <FiList className="menu-icon" />
                <span>Category</span>
              </div>
            </Link>
            
            <Link className="Link_tag" to={"/admin/all-user"}>
              <div 
                className={`admin_sidebar_menu_items ${selectedItem === "All Users" && "selected"}`} 
                onClick={() => handleMenuItemClick("All Users")}
              >
                <FiUsers className="menu-icon" />
                <span>Users</span>
              </div>
            </Link>
            
            <Link className="Link_tag" to={"/admin/offer-banner"}>
              <div 
                className={`admin_sidebar_menu_items ${selectedItem === "Banner" && "selected"}`} 
                onClick={() => handleMenuItemClick("Banner")}
              >
                <FiImage className="menu-icon" />
                <span>Banner</span>
              </div>
            </Link>
          </div>
          
          <div className="admin_sidebar_footer">
            <div 
              className="admin_sidebar_menu_items logout-button"
              onClick={handleLogout}
            >
              <FiLogOut className="menu-icon" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminsidebar;