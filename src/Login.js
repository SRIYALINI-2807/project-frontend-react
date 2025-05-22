import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password.length !== 8) {
      setError('Password must be exactly 8 characters long.');
      return;
    }

    const savedProfile = JSON.parse(localStorage.getItem('profile'));

    if (savedProfile && formData.username === savedProfile.username && formData.password) {
      localStorage.setItem('user', JSON.stringify({ username: formData.username }));
      navigate('/'); // Redirect to homepage
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
