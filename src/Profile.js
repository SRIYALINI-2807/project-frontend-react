import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const profile = JSON.parse(localStorage.getItem('profile'));

  if (!profile) {
    return (
      <div className="profile">
        <h2>No Profile Found</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="profile">
      <h2>Welcome, {profile.username}</h2>
      <p>Your profile is successfully displayed!</p>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
};

export default Profile;
