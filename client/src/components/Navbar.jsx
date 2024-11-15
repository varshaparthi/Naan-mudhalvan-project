// import React, { useContext } from "react";
import React, { useContext } from "react";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";

const Navbar = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const { logout } = useContext(GeneralContext);

  const renderNavOptions = () => {
    if (!userType) {
      return (
        <>
          <h3>SkyBound</h3>
          <div className="nav-options">
            <p onClick={() => navigate("/auth")}>Login</p>
            <p onClick={() => navigate("/")}>Home</p>
          </div>
        </>
      );
    }

    switch (userType) {
      case "customer":
        return (
          <>
            <h3>SkyBound</h3>
            <div className="nav-options">
              <p onClick={() => navigate("/")}>Home</p>
              <p onClick={() => navigate("/bookings")}>Bookings</p>
              <p onClick={logout}>Logout</p>
            </div>
          </>
        );

      case "admin":
        return (
          <>
            <h3>SkyBound (Admin)</h3>
            <div className="nav-options">
              <p onClick={() => navigate("/admin")}>Home</p>
              <p onClick={() => navigate("/all-users")}>Users</p>
              <p onClick={() => navigate("/all-bookings")}>Bookings</p>
              <p onClick={() => navigate("/all-flights")}>Flights</p>
              <p onClick={logout}>Logout</p>
            </div>
          </>
        );

      case "flight-operator":
        return (
          <>
            <h3>SkyBound(Operator)</h3>
            <div className="nav-options">
              <p onClick={() => navigate("/flight-admin")}>Home</p>
              <p onClick={() => navigate("/flight-bookings")}>Bookings</p>
              <p onClick={() => navigate("/flights")}>Flights</p>
              <p onClick={() => navigate("/new-flight")}>Add Flight</p>
              <p onClick={logout}>Logout</p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return <div className="navbar">{renderNavOptions()}</div>;
};

export default Navbar;
