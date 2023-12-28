import React from 'react';
import '../../assets/styles/UserLandingPage.css';
import Favorites from '../favorites/Favorites';

const UserLandingPage = ({ user }) => {
  return (
    <div className="UserLandingpage">
      <div className="LogoWrapper">
        <h1 className="Logo">
          WIND<span>MATE</span>
        </h1>
        <h2 className="LogoSub">
          WIND<span>PREDICTION</span> FOR{' '}
          <span>{user ? user.username.toUpperCase() : 'SURFERS'}</span>
        </h2>
      </div>
      <>
        {user.favorites ? (
          <Favorites user={user} />
        ) : (
          <div>No favorite Spot mate?</div>
        )}
      </>
    </div>
  );
};

export default UserLandingPage;
