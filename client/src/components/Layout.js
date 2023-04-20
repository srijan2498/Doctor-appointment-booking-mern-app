import React from "react";
import "../styles/LayoutStyles.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // User Menu
  const userMenu = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Appointments",
      path: "/appointments",
    },
    {
      name: "Profile",
      path: `/user/profile/${user?._id}`,
    },
  ];

  // Admin Menu
  const adminMenu = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
    },
    {
      name: "Users",
      path: "/admin/users",
    },
    {
      name: "Profile",
      path: `/admin/profile/${user?._id}`,
    },
  ];

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">Cupping Studio
            </div>
            <div className="menu">
              {SidebarMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div key={index}>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </div>
                );
              })}
              {user ? <div className={`menu-item `} title="Logout" onClick={handleLogout}>
                <Link to="/login"><i className="fa-solid fa-right-from-bracket"></i></Link>
              </div> : <div className={`menu-item `} id="login-btn" title="Login">
                <Link to="/login">Login</Link>
              </div>}
            </div>
          </div>
          <div className="content">
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
