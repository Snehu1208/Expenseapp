import React from 'react';
import { Link } from 'react-router-dom';
import "../style/Home.css";

const App = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="https://www.shutterstock.com/shutterstock/photos/1080327866/display_1500/stock-vector-money-care-logo-financial-management-logo-logo-template-ready-for-use-money-bag-with-hand-logo-1080327866.jpg" alt="Logo" className="navbar-brand-img" />
         
        </div>
        <ul className="navbar-ul">
          <li>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <button>Sign Up</button>
            </Link>
          </li>
        </ul>
      </nav>
      <img src='https://navi.com/blog/wp-content/uploads/2022/06/best-money-management-apps.jpg'></img>
    </>
  );
}

export default App;
