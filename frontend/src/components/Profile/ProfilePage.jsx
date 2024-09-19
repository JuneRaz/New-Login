import React from 'react';
import './design/ProfilePage.css';
import Profile from './design/Profile.jpg';

const ProfilePage = () => {
  const firstName = 'Junmar';
  const lastName = 'Flores';
  const position = 'Local Government Unit';
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`;

  return (
    <div className="profile-page">
    

      <main className="profile-main-content">
        <div className="profile-container">
          {/* Profile Picture */}
          <div className="profile-picture">
            <img src={Profile} alt="Profile" />
          </div>

          {/* Profile Information */}
          <div className="profile-info">
            <h2>{firstName} {lastName}</h2>
            <h3>{position}</h3>
            <p>{description}</p>
          </div>
        </div>
      </main>

      <footer className="profile-footer">
        <p>&copy; 2024 My Profile Page. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
