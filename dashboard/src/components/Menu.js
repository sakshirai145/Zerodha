import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Menu = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const menuItems = [
    { label: "Dashboard", path: "/", index: 0 },
    { label: "Orders", path: "/orders", index: 1 },
    { label: "Holdings", path: "/holdings", index: 2 },
    { label: "Positions", path: "/positions", index: 3 },
    { label: "Funds", path: "/funds", index: 4 },
    { label: "Apps", path: "/apps", index: 6 },
  ];

  const selectedMenu = menuItems.find((item) => item.path === location.pathname)?.index ?? 0;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const initials = user
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "ZU";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="Zerodha" />
      <div className="menus">
        <ul>
          {menuItems.map((item) => (
            <li key={item.index}>
              <Link
                style={{ textDecoration: "none" }}
                to={item.path}
              >
                <p
                  className={
                    selectedMenu === item.index ? activeMenuClass : menuClass
                  }
                >
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div
          className="profile"
          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          ref={dropdownRef}
        >
          <div className="avatar">{initials}</div>
          <div className="profile-info">
            {user && (
              <p className="welcome-text">Welcome, {user.name}</p>
            )}
            <p className="username">
              {user ? user.email : "USERID"}
            </p>
          </div>
          {isProfileDropdownOpen && user && (
            <div className="profile-dropdown">
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <button className="dropdown-item" onClick={() => setIsProfileDropdownOpen(false)}>
                  Profile
                </button>
              </Link>
              <button className="dropdown-item" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
