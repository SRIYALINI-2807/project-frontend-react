import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    kidName: '',
    kidAge: '',
  });

  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (formData.password.length !== 8) {
      alert('Password must be exactly 8 characters long!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Invalid email format!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201 || response.status === 200) {
        // Save profile information in localStorage
        localStorage.setItem('profile', JSON.stringify({
          username: formData.username,
          email: formData.email,
          kidName: formData.kidName,
          kidAge: formData.kidAge,
        }));
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error('Registration error:', error.response || error.message || error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Kid's Name:</label>
          <input
            type="text"
            name="kidName"
            value={formData.kidName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Kid's Age:</label>
          <input
            type="number"
            name="kidAge"
            value={formData.kidAge}
            onChange={handleChange}
            required
            min="1"
            max="10"
          />
        </div>
        <button type="submit" className="register-button">Register</button>
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default Register;
