import React from 'react';
import '../assets/styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';

import UserLandingPage from '../features/userLandingPage/UserLandingPage';

const LandingPage = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="landingpage">
      {user ? (
        <UserLandingPage user={user} />
      ) : (
        <>
          <div className="LogoWrapper">
            <h1 className="Logo">
              WIND<span>MATE</span>
            </h1>
            <h2 className="LogoSub">
              WIND<span>PREDICTION</span> FOR <span>SURFERS</span>
            </h2>
          </div>
          <div className="Register">
            <button type="button" onClick={() => navigate('/sign-in')}>
              LOG<span>IN</span>
            </button>
            <button type="button" onClick={() => navigate('/sign-up')}>
              REGISTER<span>NOW</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
