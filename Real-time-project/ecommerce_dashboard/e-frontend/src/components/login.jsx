import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignUp.css'; // Import the CSS file for styling
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error,setError]=useState('');

  // Effect to check if user is already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('users');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

    // Function to validate form fields
    const validateForm = () => {
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email.");
        return false;
      }
      if (!password || password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return false;
      }
      setError('');
      return true;
    };
  // Function to collect data and submit
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the form from submitting and reloading the page
    if(!validateForm()) return;
    console.log(email, password);

    try {
      let result = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      result = await result.json();
      console.log(result);

      // Store user data in local storage if the login is successful
      if (result) {
        localStorage.setItem('users', JSON.stringify(result));
        toast.success("Login successful!");
        navigate('/'); // Redirect to the homepage after successful login
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("Error during authentication. Please try again.");
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Login</h1>
      <form className="signup-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && !email && <span  style={{ color: "red" }}>{error}</span>}
        <input
          type="password"
          placeholder="Enter Password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && !password && <span style={{ color: "red" }}>{error}</span>}
        <button type="submit" className="signup-btn">
          Log In
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
