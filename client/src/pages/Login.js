import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../style/Login.css"
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/api/v1/users/login", values); // Assuming your API endpoint is '/api/v1/users/login'
      const { data } = response;
      setLoading(false);
      if (data.success) {
        message.success("Login success");
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, password: "" })
        );
        navigate("/");
      } else {
        message.error(data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      message.error("Something went wrong");
    }
  };

  // Prevent login for authenticated user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="Login1">
      {loading && <Spinner />}
      <Form
        layout="vertical"
        onFinish={submitHandler}
        className="form"
      >
        <h1>Login Form</h1>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input type="email" className="w-full" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input type="password" className="w-full" />
        </Form.Item>
        <div className="footers">
          <Link to="/register" className="user">
            Not a user? Click Here to register
          </Link>
          <button
            type="submit"
            className="button"
          >
            Login
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Login;