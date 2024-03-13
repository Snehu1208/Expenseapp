import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import "../../style/Header.css"
const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>

      <nav className="navbar navbar-expand-lg bg-light">
      <Link className="navbar-brand" to="/"> Expense Management </Link>

            <p className="nav-link">{loginUser && loginUser.name}</p>{" "}

            <button className="button" onClick={logoutHandler}>
              Logout
            </button>

       
        
      </nav>
    </>
  );
};

export default Header;