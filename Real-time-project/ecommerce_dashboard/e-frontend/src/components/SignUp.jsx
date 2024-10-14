import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignUp.css'; // Import the CSS file for styling

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Effect to check if user is already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('users');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  // Function to validate form fields
  const validateForm = () => {
    if (!name || name.length < 3) {
      setError("Name must be at least 3 characters long.");
      return false;
    }
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
  const collectData = async (e) => {
    e.preventDefault(); // Prevent form reload
    if (!validateForm()) return; // Run validation

    console.log(name, email, password);

    try {
      let result = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      result = await result.json();
      console.log(result);

      // Store user data in local storage if the registration is successful
      if (result) {
        localStorage.setItem('users', JSON.stringify(result));
        console.log("Data has been inserted into the database...");
        navigate('/'); // Redirect to the homepage after successful signup
      }
    } catch (error) {
      console.error("Error during data submission:", error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Register</h1>
      <form className="signup-form" onSubmit={collectData}>
        <input
          type="text"
          placeholder="Enter Name"
          className="signup-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <span className="error-message" style={{ color: "red" }}>{error}</span>}
        <input
          type="email"
          placeholder="Enter Email"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && !email && <span className="error-message" style={{ color: "red" }}>{error}</span>}
        <input
          type="password"
          placeholder="Enter Password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && !password && <span className="error-message" style={{ color: "red" }}>{error}</span>}
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
